const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
    require: [true, "customer account id is required"],
  },
  cartItems: {
    type: [
      {
        name: {
          type: String,
          required: [true, "Please add a name"],
          trim: true,
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: [true, "a valid product id is required"],
        },
        productPrice: {
          type: Number,
          required: [true, "product price is required"],
        },
        image: {
          type: String,
          required: [true, "please add a image"],
        },
        quantity: {
          type: Number,
          min: 1,
          max: [6, "maximum only 6 items per product"],
          default: 1,
        },
      },
    ],
    default: [],
  },
});
const cart = mongoose.model("cart", cartSchema);
module.exports = cart;
