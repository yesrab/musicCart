const express = require("express");
const router = express.Router();
const {
  testAccountRoute,
  createAccount,
  loginAccount,
} = require("../controllers/account");

router.route("/test").get(testAccountRoute);
router.route("/create").post(createAccount);
router.route("/login").post(loginAccount);
module.exports = router;
