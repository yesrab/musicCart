const express = require("express");
require("dotenv").config();
require("express-async-errors");
//evn
const PORT = process.env.PORT || 8080;
const DB_URI = process.env.DB;
//env

const app = express();
const path = require("path");
const connectDB = require("./db/connect");

//express body json parsing middleware
app.use(express.json());

//express url parsing middleware
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from the server",
    status: "success",
    currentTime: new Date().toISOString(),
    path: req.path,
    url: req.originalUrl,
  });
});
app.get("/image", (req, res) => {
  const pathName = path.resolve(__dirname, "./images/400/400_1.jpg");
  res.sendFile(pathName);
});

//account routes import
const accoutrRouter = require("./routes/account");
app.use("/api/v1/account/", accoutrRouter);
//products route import
const productRouter = require("./routes/product");
app.use("/api/v1/products", productRouter);
//invoice route import
const invoiceRouter = require("./routes/invoice");
app.use("/api/v1/invoices/", invoiceRouter);
//globalError handler middleware
const gloablErrorHandler = require("./middleware/globalErrorHandler");
app.use(gloablErrorHandler);

//start server and connet to db
const startServer = async () => {
  try {
    await connectDB(DB_URI);
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server is listening port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
