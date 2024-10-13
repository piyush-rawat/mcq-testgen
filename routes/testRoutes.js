const express = require("express");

const User = require("../models/User");
const Test = require("../models/Test");
const moment = require("moment");

const router = express.Router();

// Get a test
router.get("/:slug", async (req, res) => {
  try {
    const { user_id } = req.headers;
    const { slug } = req.params;
    const test = await Test.findOne({ slug });

    // Check if test exists
    if (!test)
      return res.json({ error: "Test not found", status: "NOT FOUND" });

    // Check if already submitted
    let isAlreadySubmitted;
    test.results.map((item) => {
      if (item.user_id === user_id) isAlreadySubmitted = true;
    });

    if (isAlreadySubmitted) {
      return res.json({ error: "Already Submitted", status: "SUBMITTED" });
    }

    // Check if before time
    const timeFormat = "MMMM Do hh:mm:00 a";
    const currentTime = moment();

    const startTime = moment(test.startTime, timeFormat);
    const endTime = moment(test.endTime, timeFormat);

    if (currentTime.isBefore(startTime)) {
      return res.json({
        error: "Test has not started",
        startTime: test.startTime,
        status: "BEFORE",
      });
    }

    // Check if after time
    if (moment(currentTime).isAfter(endTime)) {
      return res.json({
        error: "This test is over",
        endTime: test.endTime,
        status: "AFTER",
      });
    }

    return res.json({ test, status: "ONGOING" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server Error. Please try again later." });
  }
});

// Submit a test
router.post("/:slug", async (req, res) => {
  try {
    const { user_id } = req.headers;
    const { slug } = req.params;
    const { answers } = req.body;

    // Check if test exists
    const test = await Test.findOne({ slug });
    if (!test) return res.json({ error: "Test not found" });

    // Check if already submitted
    let isAlreadySubmitted;
    test.results.map((item) => {
      if (item.user_id === user_id) isAlreadySubmitted = true;
    });

    if (isAlreadySubmitted) {
      return res.json({ error: "Already Submitted" });
    }

    const user = await User.findById(user_id);

    const currentTime = moment().format("MMMM Do hh:mm:00 a").toString();

    if (moment(currentTime).isAfter(moment(test.endTime))) {
      return res.json({ error: "This test is over!" });
    }

    let marksObtained = 0;
    let totalMarks = 0;
    // Check answers
    test.questions.map((q) => {
      totalMarks++;
      const answer = answers[q.question];
      if (answer === q.answer) {
        marksObtained++;
      } else {
        // Wrong answer
      }
    });

    const marksInPercent = (marksObtained / totalMarks) * 100;

    test.results.push({
      user_id: user_id,
      name: user.name,
      email: user.email,
      marksObtained: marksObtained,
      marksInPercent,
      submittedAt: "Hello",
    });

    await test.save();

    return res.json({ message: "Submitted Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server Error. Please try again later" });
  }
});

module.exports = router;
