const mongoose = require("mongoose");
const feedbackError = (error, request, responce) => {
  const errorObject = {
    feedbackType: "",
    feedbackDetails: "",
  };

  if (error instanceof mongoose.Error.ValidationError) {
    const validationKeys = Object.keys(error.errors);
    for (let key of validationKeys) {
      errorObject[key] = error.errors[key].message;
    }
    return responce.status(400).json({
      error: errorObject,
      status: "Error",
      message: "Validation error!",
    });
  }
};
module.exports = feedbackError;
