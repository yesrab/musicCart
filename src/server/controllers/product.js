const products = require("../models/products");
const cart = require("../models/cart");
const invoice = require("../models/invoice");
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

  let totalMRP = 0;
  let discountMRP = 0;
  let convenienceFee = 45;

  cartItems.forEach((item) => {
    totalMRP += item.subTotal;
  });
  responce.json({
    _id,
    customerId,
    cartItems,
    totalMRP,
    discountMRP,
    convenienceFee,
    grandTotal: totalMRP + convenienceFee + discountMRP,
    stale: false,
  });
};

const addItemToCart = async (request, responce) => {
  const { id } = responce.locals.tokenData;
  const { _id, name, price, url, color } = request.body;
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
      color,
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

const changeQuantity = async (request, responce) => {
  const { id } = responce.locals.tokenData;
  const { cartBlock, newQuantity, productId } = request.body;
  let cartData = await cart.findOne({ customerId: id });
  const existingProductIndex = cartData.cartItems.findIndex(
    (item) => item.productId.toString() === productId
  );
  if (existingProductIndex != -1) {
    cartData.cartItems[existingProductIndex].quantity = newQuantity;
    await cartData.save();
    return responce.status(200).json({
      status: "success",
      message: "quantity updated",
      cartData,
    });
  } else {
    return responce.status(404).json({
      status: "Error",
      message: "Product dose not exist",
    });
  }
};

const getPurchaseData = async (request, responce) => {
  const { id, name } = responce.locals.tokenData;
  // console.log(responce.locals.tokenData);
  const userCart = await cart.findOne({
    customerId: id,
  });
  if (!userCart) {
    return responce.status(404).json({
      status: "Error",
      message: "Cart not found",
    });
  }
  if (userCart.cartItems.length == 0) {
    return responce.status(404).json({
      status: "Error",
      message: "Cart not found",
    });
  }

  const { _id, customerId, cartItems } = userCart;

  let totalMRP = 0;
  let discountMRP = 0;
  let convenienceFee = 45;

  cartItems.forEach((item) => {
    totalMRP += item.subTotal;
  });
  responce.json({
    customerName: name,
    userCart,
    totalMRP,
    discountMRP,
    convenienceFee,
    grandTotal: totalMRP + convenienceFee + discountMRP,
  });
};

const commitPurchase = async (request, responce) => {
  const { customerAddress, paymentMethod } = request.body;
  console.log(request.body);
  const { id, name } = responce.locals.tokenData;
  const userCart = await cart.findOne({
    customerId: id,
  });
  if (!userCart) {
    return responce.status(404).json({
      status: "Error",
      message: "User not Found",
    });
  }
  if (userCart.cartItems.length == 0) {
    return responce.status(404).json({
      status: "Error",
      message: "Empty cart!",
    });
  }
  const { _id, customerId, cartItems } = userCart;
  const newInvoice = await invoice.create({
    customerId: id,
    customerAddress,
    paymentMethod,
    purchasedItems: cartItems,
  });
  if (newInvoice) {
    userCart.cartItems = [];
    await userCart.save();
  }
  responce.json({ message: "Items purchased!", newInvoice, status: "success" });
};

module.exports = {
  test,
  getAllProducts,
  getProduct,
  addItemToCart,
  getCart,
  changeQuantity,
  getPurchaseData,
  commitPurchase,
};
