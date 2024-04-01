const express = require("express");
const router = express.Router();
const { getImage } = require("../controllers/images");

router.get("/galary/:imageID", getImage);

module.exports = router;
