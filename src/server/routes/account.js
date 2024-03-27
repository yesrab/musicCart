const express = require("express");
const router = express.Router();
const { testAccountRoute, createAccount } = require("../controllers/account");

router.route("/test").get(testAccountRoute);
router.route("/create").post(createAccount);
module.exports = router;
