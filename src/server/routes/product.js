const express = require("express");
const router = express.Router();
const { test, getAllProducts, getProduct } = require("../controllers/product");
router.route("/test").get(test);
router.route("/allProducts").get(getAllProducts);
router.route("/product/:productID").get(getProduct);
module.exports = router;
