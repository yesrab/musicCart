const feedback = require("../models/feedback");

const submitFeedback = async (request, responce) => {
  const { feedbackType, feedbackDetails } = request.body;
  const submittedFeedback = await feedback.create({
    feedbackType,
    feedbackDetails,
  });
  responce.json({ status: "success", data: submittedFeedback });
};

module.exports = { submitFeedback };
