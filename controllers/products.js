const { response, request } = require("express");

const { Product } = require("../models/");

const getProducts = async (req = request, res = response) => {
  res.json("Get products");
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
