const globalErrorHandler = (error, request, responce, next) => {
  console.log(error);
  return responce.status(error.statusCode || 500).json({
    message: "You have triggered server's global error handler",
    error: error.message,
    status: "Error",
  });
};
module.exports = globalErrorHandler;
