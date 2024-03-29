const mongoose = require("mongoose");
const accountError = require("../errors/accountError");
const globalErrorHandler = (error, request, responce, next) => {
  console.log("message from global handler", error);
  // console.log(error.)
  if (error.code == 11000) {
    return accountError(error, request, responce);
  }

  if (
    error instanceof mongoose.Error.ValidationError &&
    error._message === "Account validation failed"
  ) {
    console.log("Validation error");
    return accountError(error, request, responce);
  }

  return responce.status(error.statusCode || 500).json({
    message: "You have triggered server's global error handler",
    error: error.message,
    status: "Error",
  });
};
module.exports = globalErrorHandler;
