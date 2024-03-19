const express = require("express");
require("dotenv").config();
require("express-async-errors");
const PORT = 8080;
const app = express();
app.listen(PORT, () => console.log(`Server is listening port ${PORT}...`));
