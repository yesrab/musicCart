const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
    require: [true, "customer account id is required"],
    unique: true,
  },
  cartItems: {
    type: [
      {
        name: {
          type: String,
          required: [true, "Please add a name"],
          trim: true,
        },
        color: {
          type: String,
          required: [true, "Please add a color"],
          enum: {
            values: ["blue", "brown", "black", "white"],
            message: "{value} is not a supported color",
          },
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
          max: [8, "maximum only 8 items per product"],
          default: 1,
        },
        subTotal: {
          type: Number,
          default: 0,
        },
      },
    ],
    default: [],
  },
});

cartSchema.pre("save", function (next) {
  this.cartItems.forEach((productObj) => {
    productObj.subTotal = productObj.productPrice * productObj.quantity;
  });
  next();
});

const cart = mongoose.model("cart", cartSchema);
module.exports = cart;
