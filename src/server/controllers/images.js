const products = require("../models/products");
const path = require("path");
const getImage = async (req, res) => {
  const { imageID } = req.params;
  try {
    let imageUrl = null;
    let model = null;
    let imagePath = null;
    const allProducts = await products.find(); // Fetch all products from the database

    for (const product of allProducts) {
      const image = product.images.find((img) => img._id.toString() === imageID);

      if (image) {
        model = product.model;
        imageUrl = image.url || image.altUrl;
        imagePath = path.resolve(__dirname, `../images/${model}/${imageID}.jpg`);
        break;
      }
    }

    if (imageUrl) {
      return res.status(200).sendFile(imagePath);
    } else {
      res.status(404).send({ message: "Image not found", status: "Error" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Server error", error: error.message, status: "Error" });
  }
};

module.exports = { getImage };
