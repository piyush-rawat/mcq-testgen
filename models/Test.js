const mongoose = require("mongoose");

const ExamSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: { type: [String], required: true },
      answer: { type: String, required: true },
    },
  ],
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  timeLimit: { type: String },
  results: [
    {
      user_id: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      marksObtained: { type: String, required: true },
      marksInPercent: { type: String, required: true },
      submittedAt: { type: String, required: true },
    },
  ],
  resultsCount: { type: Number },
  slug: { type: String, required: true },
});

module.exports = mongoose.model("Exam", ExamSchema);
