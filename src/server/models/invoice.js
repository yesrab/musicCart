const mongoose = require("mongoose");
const invoiceSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
    require: [true, "customer account id is required"],
  },
  customerAddress: {
    type: String,
    required: [true, "a delivery address is required"],
  },
  paymentMethod: {
    type: String,
    required: [true, "please choose a valid payment service"],
    enum: {
      values: ["POD", "UPI", "CARD"],
      message: "{value} is not an valid payment option",
    },
  },
  totalMRP: {
    type: Number,
    required: [true, "Total over the MRP is required"],
    default: 0,
  },
  discountMRP: {
    type: Number,
    default: 0,
  },
  convenienceFee: {
    type: Number,
    default: 45,
  },
  grandTotal: {
    type: Number,
    default: 0,
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

invoiceSchema.pre("save", function (next) {
  let totalPrice = 0;
  this.cartItems.forEach((productObj) => {
    const sub = productObj.productPrice * productObj.quantity;
    productObj.subTotal = sub;
    totalPrice += productObj.subTotal;
  });
  this.totalMRP = totalPrice;
  this.grandTotal = totalPrice + this.convenienceFee + this.discountMRP;
  next();
});

const invoice = mongoose.model("invoice", invoiceSchema);
module.exports = invoice;
