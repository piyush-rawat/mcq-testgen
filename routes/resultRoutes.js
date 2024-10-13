const express = require("express");
const Test = require("../models/Test");
const router = express.Router();

router.get("/:slug", async (req, res) => {
  try {
    const { user_id } = req.headers;
    const { slug } = req.params;

    const test = await Test.findOne({ slug });

    if (!test) {
      return res.json({ error: "No Test found" });
    }

    // Check if
    console.log(test.user, user_id);
    if (test.user.toString() !== user_id.toString()) {
      return res.json({ error: "Access Denied" });
    }

    return res.json({ title: test.title, results: test.results });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server Error. Please try again later.");
  }
});

module.exports = router;
