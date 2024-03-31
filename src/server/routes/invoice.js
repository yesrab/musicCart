const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const { test, getMyInvoice, getOneInvoice } = require("../controllers/invoice");
router.route("/test").get(test);
router.route("/getmyinvoice").get(requireAuth, getMyInvoice);
router.route("/:invoiceId").get(requireAuth, getOneInvoice);

module.exports = router;
