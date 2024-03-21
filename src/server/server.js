const express = require("express");
require("dotenv").config();
require("express-async-errors");
const PORT = 8080;
const app = express();
const fs = require("fs");
const path = require("path");
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});
app.get("/image", (req, res) => {
  const pathName = path.resolve(__dirname, "./images/image1.png");
  res.sendFile(pathName);
});
app.listen(PORT, () => console.log(`Server is listening port ${PORT}...`));
