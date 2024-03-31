const invoice = require("../models/invoice");

const test = (req, res) => {
  res.json({ server: "s" });
};

const getMyInvoice = async (request, responce) => {
  const { id, name } = responce.locals.tokenData;
  const myInvoices = await invoice.find({
    customerId: id,
  });
  if (!myInvoices.length) {
    return responce.status(404).json({
      status: "Error",
      message: "you have no invoices",
    });
  }
  responce.status(200).json({
    name: name,
    status: "success",
    message: "All your invoices",
    nbhits: myInvoices.length,
    myInvoices,
  });
};

const getOneInvoice = async (request, responce) => {
  const { id, name } = responce.locals.tokenData;
  const invoiceId = request.params.invoiceId;
  const oneInvoice = await invoice.findOne({
    _id: invoiceId,
    customerId: id,
  });
  if (!oneInvoice) {
    return responce.status(404).json({
      status: "Error",
      message: "invoice not found",
    });
  }
  responce.status(200).json({
    name: name,
    status: "success",
    message: "invoice found",
    oneInvoice,
  });
};

module.exports = { test, getMyInvoice, getOneInvoice };

