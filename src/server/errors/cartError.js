const mongoose = require("mongoose");

const cartError = (error, request, response) => {
  const errorObject = {
    customerId: "",
    cartItems: [],
  };
  let message = "Validation error!";
  if (error instanceof mongoose.Error.ValidationError) {
    const validationErrors = error.errors;
    for (let key in validationErrors) {
      const path = key.split(".");
      let target = errorObject;

      for (let i = 0; i < path.length - 1; i++) {
        if (!target[path[i]]) {
          target[path[i]] = {};
        }
        target = target[path[i]];
      }
      target[path[path.length - 1]] = validationErrors[key].message;
    }
    const str = JSON.stringify(errorObject);
    if (str.includes("maximum only 6 items per product")) {
      message = "maximum only 6 items per product";
    }
    return response.status(400).json({
      error: errorObject,
      status: "Error",
      message: message,
    });
  }
};

module.exports = cartError;
