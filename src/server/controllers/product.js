const products = require("../models/products");
const cart = require("../models/cart");

const test = (req, res) => {
  res.status(200).json({
    message: "hello from product route test",
    status: "success",
  });
};

const getAllProducts = async (request, responce) => {
  let cartSize;

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

  if (!responce.locals.tokenStatus) {
    cartSize = 0;
  } else {
    const { id } = responce.locals.tokenData;
    const existingCart = await cart.findOne({
      customerId: id,
    });
    if (existingCart) {
      cartSize = existingCart.cartItems.length;
    } else {
      const newCart = await cart.create({ customerId: id });
      cartSize = 0;
    }
  }

  const nbHits = allProducts.length;
  responce.status(200).json({
    allProducts,
    status: "success",
    nbHits,
    cartSize: cartSize,
  });
};

const getProduct = async (request, responce) => {
  const { productID } = request.params;
  console.log(productID);
  const product = await products.findById(productID);
  if (product) {
    return responce.status(200).json({
      requestedID: productID,
      product,
      status: "success",
      path: request.path,
      url: request.originalUrl,
    });
  }
  responce.status(404).json({
    requestedID: productID,
    status: "Error",
  });
};
const getCart = async (request, responce) => {
  const { id } = responce.locals.tokenData;
  const userCart = await cart.findOne({
    customerId: id,
  });
  if (!userCart) {
    const newCart = await cart.create({ customerId: id });
    const { _id, customerId, cartItems } = newCart;
    return responce.status(201).json({
      _id,
      customerId,
      cartItems,
      stale: false,
    });
  }
  const { _id, customerId, cartItems } = userCart;
  responce.json({
    _id,
    customerId,
    cartItems,
    stale: false,
  });
};

const addItemToCart = async (request, responce) => {
  const { id } = responce.locals.tokenData;
  const { _id, name, price, url } = request.body;
  // console.log({ _id, name, price, url });
  let cartData = await cart.findOne({ customerId: id });
  const existingProductIndex = cartData.cartItems.findIndex(
    (item) => item.productId.toString() === _id
  );

  if (existingProductIndex !== -1) {
    cartData.cartItems[existingProductIndex].quantity += 1;
  } else {
    cartData.cartItems.push({
      name: name,
      productId: _id,
      productPrice: price,
      image: url,
      quantity: 1,
    });
  }

  // Save the updated cart data
  await cartData.save();
  const { _id: cartId, customerId, cartItems } = cartData;
  responce.json({
    _id: cartId,
    customerId,
    cartItems,
    status: "success",
    message: `added item ${name}`,
  });
};

module.exports = { test, getAllProducts, getProduct, addItemToCart, getCart };
