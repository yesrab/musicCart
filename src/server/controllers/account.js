const testAccountRoute = (req, res) => {
  res.status(200).json({
    message: "this is account route and it works",
    status: "success",
  });
};

const createAccount = (request, responce) => {
  console.log("hit account creation route");
  responce.status(200).json({
    message: "this is account route and it works",
    status: "success",
  });
};

module.exports = { testAccountRoute, createAccount };
