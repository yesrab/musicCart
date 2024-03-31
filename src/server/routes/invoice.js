const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const { test, getMyInvoice } = require("../controllers/invoice");
router.route("/test").get(test);
router.route("/getmyinvoice").get(requireAuth, getMyInvoice);

module.exports = router;
