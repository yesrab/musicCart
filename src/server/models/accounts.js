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
    validate: [isMobilePhone, "Please add a valid number"],
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
  const user = await this.findOne({
    $or: [{ email: accountInfo }, { number: accountInfo }],
  });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new mongoose.Error(JSON.stringify({ path: "password", msg: "Incorrect email/password" }));
  }
  throw new mongoose.Error(
    JSON.stringify({ path: "number", path: "email", msg: "Incorrect email/password" })
  );
};
