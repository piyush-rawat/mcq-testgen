const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String },
  password: { type: String },
  exams: [
    {
      exam_id: { type: mongoose.Schema.Types.ObjectId },
      title: { type: String, required: true },
      key: { type: String, required: true },
      resultsCount: { type: String },
    },
  ],
  refreshTokens: {
    type: [String],
    createdAt: { type: Date, default: Date.now, expires: "7d" },
  },
});

module.exports = mongoose.model("User", UserSchema);
