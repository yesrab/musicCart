const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail, isMobilePhone } = require("validator");
const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please add a valid email"],
  },
  mobileNumber: {
    type: Number,
    required: [true, "Please add a number"],
    unique: true,
    validate: [
      (val) => {
        return isMobilePhone(val.toString());
      },
      "Please add a valid number",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
});

AccountSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

AccountSchema.statics.login = async function (accountInfo, password) {
  const loginError = new mongoose.Error.ValidationError();
  loginError.message = "Account login failed";
  loginError._message = "Account validation failed";
  loginError.errors.password = {
    name: "loginError",
    message: "Incorrect email/password",
  };

  const user = await this.findOne({
    $or: [{ email: accountInfo }, { number: accountInfo }],
  });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw loginError;
    // throw new mongoose.Error.ValidationError(
    //   JSON.stringify({ path: "password", msg: "Incorrect email/password" })
    // );
  }
  throw loginError;
  // throw new mongoose.Error.ValidationError(
  //   JSON.stringify({ path: "password", msg: "Incorrect email/password" })
  // );
};

const account = mongoose.model("Account", AccountSchema);
module.exports = account;
