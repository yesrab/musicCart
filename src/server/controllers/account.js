const testAccountRoute = (req, res) => {
  res.status(200).json({
    message: "this is account route and it works",
    status: "success",
  });
};
const account = require("../models/accounts");

const jwt = require("jsonwebtoken");
const secrete = process.env.JWT_SUPER_SEACRETE || "superGupthKey";
const generateToken = (idObj) => {
  return jwt.sign(idObj, secrete);
};

const createAccount = async (request, responce) => {
  console.log("hit account creation route");
  const { password, mobileNumber, email, name } = request.body;
  const savedAccount = await account.create({
    name,
    email,
    mobileNumber,
    password,
  });
  if (savedAccount) {
    const {
      _id,
      name: savedName,
      email: savedEmail,
      mobileNumber: number,
    } = savedAccount;
    const id = _id.toString();
    const token = generateToken({ id, name: savedName, email: savedEmail });
    return responce.status(201).json({
      id: id,
      name: savedName,
      email: savedEmail,
      mobileNumber: number,
      message: "account created!",
      status: "success",
      token,
    });
  }
  responce.status(200).json({
    savedAccount,
    message: "account created!",
    status: "success",
  });
};

const loginAccount = async (request, responce) => {
  const { password, userIdentifier } = request.body;
  const user = await account.login(userIdentifier, password);

  if (user) {
    const {
      _id,
      name: savedName,
      email: savedEmail,
      mobileNumber: number,
    } = user;
    const id = _id.toString();
    const token = generateToken({ id, name: savedName, email: savedEmail });
    return responce.status(202).json({
      id: id,
      name: savedName,
      email: savedEmail,
      mobileNumber: number,
      message: "account logged in!",
      status: "success",
      token,
    });
  }
  responce.status(404).json({
    status: "Error",
    message: "Account not found",
  });
};

module.exports = { testAccountRoute, createAccount, loginAccount };
