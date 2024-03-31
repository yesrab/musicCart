const express = require("express");
const router = express.Router();
const {
  test,
  getAllProducts,
  getProduct,
  addItemToCart,
  getCart,
  changeQuantity,
  getPurchaseData,
  commitPurchase,
} = require("../controllers/product");
const { requireAuth } = require("../middleware/authMiddleware");
router.route("/test").get(test);
router.route("/allProducts").get(requireAuth, getAllProducts);
router.route("/product/:productID").get(getProduct);
router.route("/cart/getcart").get(requireAuth, getCart);
router
  .route("/cart/additem")
  .put(requireAuth, addItemToCart)
  .patch(requireAuth, changeQuantity);
router
  .route("/placeOrder")
  .get(requireAuth, getPurchaseData)
  .post(requireAuth, commitPurchase);
module.exports = router;
