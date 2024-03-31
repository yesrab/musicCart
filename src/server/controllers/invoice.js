const invoice = require("../models/invoice");

const test = (req, res) => {
    res.json({server: "s"});
};

const getMyInvoice = async (request, responce) => {
    const {id} = responce.locals.tokenData;
    const myInvoices = await invoice.find({
        customerId: id
    })
    responce.json({
        status: "success",
        message: "All your invoices",
        nbhits: myInvoices.length,
        myInvoices,
    });
};

module.exports = {test, getMyInvoice};

