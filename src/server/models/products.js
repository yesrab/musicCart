const mongoose = require("mongoose");
const { isURL } = require("validator");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Please add a model"],
      trim: true,
    },
    productType: {
      type: String,
      required: [true, "Please add a type"],
      enum: {
        values: ["in-ear", "on-ear", "over-ear"],
        message: "{value} is not a supported type",
      },
    },
    color: {
      type: String,
      required: [true, "Please add a color"],
      enum: {
        values: ["blue", "brown", "black", "white"],
        message: "{value} is not a supported color",
      },
    },
    brand: {
      type: String,
      required: [true, "Please add a brand"],
      trim: true,
    },
    avaliable: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: [1, "Please add a valid price"],
    },
    rating: {
      type: Number,
      required: [true, "Please add a rating"],
      min: [0, "please add a value grater than equal to 0"],
      max: [5, "please add a valid less than equal to 5"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    details: {
      type: [String],
      required: [true, "Please add a details"],
    },
    images: {
      type: [
        {
          name: {
            type: String,
            required: [true, "Please add a name"],
            trim: true,
          },
          url: {
            type: String,
            required: [true, "Please add a url"],
          },
          altUrl: {
            type: String,
            required: [true, "Please add a alternate url"],
            validate: [isURL, "Please add a valid url"],
          },
        },
      ],
      required: [true, "Please add a images"],
    },
  },
  { timestamps: true }
);
const products = mongoose.model("products", productSchema);
module.exports = products;
