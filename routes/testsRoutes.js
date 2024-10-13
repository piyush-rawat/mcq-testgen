const express = require("express");
const Test = require("../models/Test");
const User = require("../models/User");

const router = express.Router();

// Get all tests
router.get("/", async (req, res) => {
  try {
    const { user_id } = req.headers;
    const tests = await Test.find({ user: user_id });

    return res.json({ tests });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server Error. Please try again later." });
  }
});

// Create a test
router.post("/", async (req, res) => {
  try {
    const { user_id } = req.headers;
    const { title, startTime, endTime, questions } = req.body;
    console.log(req.body);

    // Check if user exists
    const user = await User.findById(user_id);
    if (!user) return res.status(401).json({ error: "User not found." });

    const data = {
      user: user_id,
      title,
      startTime,
      endTime,
      questions,
      slug: crypto.randomUUID() + "-" + crypto.randomUUID(),
    };

    console.log(data);

    const test = await Test.create(data);

    return res.json({ test });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server Error. Please try again later." });
  }
});

router.put("/id", async (req, res) => {});

// Delete a test
router.delete("/:id", async (req, res) => {
  try {
    const { user_id } = req.headers;
    const { id } = req.params;

    const test = await Test.findById(id);

    if (!test) {
      return res.json({ error: "Test not found" });
    }

    if (test.user.toString() !== user_id.toString()) {
      return res.json({ error: "Not Authorized" });
    }

    await Test.deleteOne({ _id: id });

    return res.json({ message: "Test Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server Error. Please try again later." });
  }
});

module.exports = router;
