const express = require("express");
const router = express.Router();
const {
  test,
  getAllProducts,
  getProduct,
  addItemToCart,
  getCart,
} = require("../controllers/product");
const { requireAuth } = require("../middleware/authMiddleware");
router.route("/test").get(test);
router.route("/allProducts").get(requireAuth, getAllProducts);
router.route("/product/:productID").get(getProduct);
router.route("/cart/getcart").get(requireAuth, getCart);
router.route("/cart/additem").put(requireAuth, addItemToCart);
module.exports = router;
