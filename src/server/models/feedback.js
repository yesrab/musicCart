const mongoose = require("mongoose");
const feedbackSchema = mongoose.Schema({
  feedbackType: {
    type: String,
    required: [true, "please select type of feedback"],
    enum: {
      values: ["Bugs", "Feedback", "Query"],
      message: "{value} is not a supported feedback type ",
    },
  },
  feedbackDetails: {
    type: String,
    required: [true, "Please proveide your feedback message"],
    trim: true,
  },
});

const feedback = mongoose.model("feedback", feedbackSchema);
module.exports = feedback;
