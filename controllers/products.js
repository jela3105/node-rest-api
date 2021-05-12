const { response, request } = require("express");

const { Product } = require("../models/");

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
  res.json("Get product by id");
};

const createProduct = async (req = request, res = response) => {
  res.status(201).json("Create product");
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
