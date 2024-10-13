const jwt = require("jsonwebtoken");
const { decryptPayload } = require("../utils/jwt");

module.exports = (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token)
      return res.status(401).json({ error: "Token Required." });

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    // console.log("DECODED", decoded);

    if (decoded) {
      const decrypted = decryptPayload(decoded);

      // console.log("DECRYPTED", decrypted);

      // req.headers.user_id = decoded.user_id;
      req.headers.user_id = decrypted.user_id;
      return next();
    }

    return res.status(401).json({ error: "Invalid Token" });
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({ error: "Invalid Token" });
  }
};
