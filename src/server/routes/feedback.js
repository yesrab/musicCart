const express = require("express");
const router = express.Router();
const { submitFeedback } = require("../controllers/feedback");
router.route("/submitFeedback").post(submitFeedback);
module.exports = router;
