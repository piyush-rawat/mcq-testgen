const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const secretKey = process.env.JWT_SECRET;

// Encrypt the payload
const encryptPayload = (payload) => {
  const algorithm = "aes-256-cbc";
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    iv
  );
  let encrypted = cipher.update(JSON.stringify(payload), "utf-8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), encryptedData: encrypted };
};

// Create a JWT
module.exports.createJWT = (payload, expiresIn) => {
  const encryptedPayload = encryptPayload(payload);
  return jwt.sign(encryptedPayload, secretKey, { expiresIn: expiresIn });
};

module.exports.decryptPayload = (encryptedPayload) => {
  const algorithm = "aes-256-cbc";
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    Buffer.from(encryptedPayload.iv, "hex")
  );

  let decrypted = decipher.update(
    encryptedPayload.encryptedData,
    "hex",
    "utf-8"
  );
  decrypted += decipher.final("utf-8");
  return JSON.parse(decrypted);
};
