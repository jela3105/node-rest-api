const { response, request } = require("express");

const { Product, Category } = require("../models/");

const getProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { isVisible: true };

  const [total, categories] = await Promise.all([
    Product.countDocuments(query),
    await Product.find(query)
      .populate("category", "name")
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);
  res.json({ total, categories });
};

const getProductById = async (req = request, res = response) => {
  res.json({ msg: "get product by id" });
};

const createProduct = async (req = request, res = response) => {
  let { name, category, description, avaible, price } = req.body;
  categoryName = category.toUpperCase();
  const productExists = await Product.findOne({ name });
  category = await Category.findOne({ categoryName });

  if (productExists) {
    return res.status(400).json({
      msg: `The prodcut ${name} is already used`,
    });
  }
  const data = {
    name,
    price,
    category,
    user: req.user._id,
    description,
    avaible,
  };
  const product = new Product(data);
  //await product.save();
  res.status(201).json(product);
};

const updateProduct = async (req = request, res = response) => {
  res.json("Update product");
};

const deleteProduct = async (req = request, res = response) => {
  res.json("delete product");
};
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
