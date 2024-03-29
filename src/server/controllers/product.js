const products = require("../models/products");
const test = (req, res) => {
  res.status(200).json({
    message: "hello from product route test",
    status: "success",
  });
};

const getAllProducts = async (request, responce) => {
  const queryObj = {};
  const sortObj = {};
  const {
    "Headphone type": type,
    "Sort by :": sorting,
    Company,
    Colour,
    Price,
    product,
  } = request.query;

  if (product) {
    queryObj.name = { $regex: product, $options: "i" };
  }
  if (type) {
    const typeOfProduct =
      type == "In-ear headphone"
        ? "in-ear"
        : type == "On-ear headphone"
        ? "on-ear"
        : "over-ear";
    queryObj.productType = typeOfProduct;
  }
  if (Company) {
    queryObj.brand = { $regex: Company, $options: "i" };
  }
  if (Colour) {
    queryObj.color = { $regex: Colour, $options: "i" };
  }
  if (sorting) {
    const sortArray = sorting.split(":");
    for (let i = 0; i < sortArray.length; i++) {
      sortArray[i] = sortArray[i].trim();
    }
    if (sortArray[0] == "Price") {
      sortObj.price = sortArray[1] == "Highest" ? -1 : 1;
    }
    if (sortArray[0] == "Name") {
      sortObj.name = sortArray[1] == "(A-Z)" ? -1 : 1;
    }
    // console.log(sortArray);
  }
  if (Price) {
    function extractPrices(priceString) {
      const numericPart = priceString.replace(/[^\d-]/g, "");
      const [min, max] = numericPart.split("-").map(Number);
      return { min, max };
    }
    const { min, max } = extractPrices(Price);
    queryObj.price = {
      $gte: min,
      $lte: max,
    };
  }

  const allProducts = await products.find(queryObj).sort(sortObj);
  const nbHits = allProducts.length;
  responce.status(200).json({
    allProducts,
    status: "success",
    nbHits,
    cartSize: 0,
  });
};

const getProduct = async (request, responce) => {
  const { productID } = request.params;
  console.log(productID);
  const product = await products.findById(productID);
  responce.status(200).json({
    requestedID: productID,
    product,
  });
};

module.exports = { test, getAllProducts, getProduct };
