const express = require("express");
const {
  authenticateGoogleToken,
  getAccessToken,
  logout,
} = require("../controllers/auth");
const router = express.Router();

router.post("/google", authenticateGoogleToken);
router.post("/refresh", getAccessToken);
router.post("/logout", logout);

module.exports = router;
