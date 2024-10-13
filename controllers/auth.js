const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const User = require("../models/User");
const { createJWT, decryptPayload } = require("../utils/jwt");

exports.authenticateGoogleToken = async (req, res) => {
  try {
    const { google_token } = req.body;

    if (!google_token) return res.json({ error: "Token is required." });

    const ticket = client.verifyIdToken({
      idToken: google_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const googlePayload = (await ticket).getPayload();

    const { name, email, picture } = googlePayload;

    let user = await User.findOne({ email });

    // If user does not exist create a new account
    if (!user) {
      user = await User.create({ name, email, picture });
    } else {
      // Check if profile image changed.
      if (!user.picture || user.picture !== picture) {
        user.picture = picture;
        await user.save();
      }
    }

    // Generate access and refresh tokens
    const refresh_token = createJWT({ user_id: user._id }, "7d");
    const access_token = createJWT({ user_id: user._id }, "15m");

    user.refreshTokens.push(refresh_token);

    await user.save();

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      user: { name: user.name, email: user.email, picture: user.picture },
      access_token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server Error. Please try again later." });
  }
};

exports.getAccessToken = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);

    if (decoded) {
      const decrypted = decryptPayload(decoded);
      const user = await User.findById(decrypted.user_id);

      if (user && user.refreshTokens.includes(refresh_token)) {
        const new_access_token = createJWT(
          { user_id: decrypted.user_id },
          "15m"
        );

        return res.json({ access_token: new_access_token });
      } else {
        res.clearCookie("refresh_token");
        return res.status(401).json({ error: "Unauthorized" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

// Logout
exports.logout = async (req, res) => {
  const refresh_token = req.cookies.refresh_token;

  if (refresh_token) {
    // Delete Refresh Token from database
    const user = await User.findOne({ refreshTokens: refresh_token });

    if (user) {
      user.refreshTokens = user.refreshTokens.filter(
        (token) => token !== refresh_token
      );
      await user.save();
    }

    res.clearCookie("refresh_token");
  }

  return res.sendStatus(204);
};
