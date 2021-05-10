const { response, request } = require("express");

const User = require("../models/user");

const getCategories = async (req = request, res = response) => {
  res.json("get all categories");
};
const getCategoryById = async (req = request, res = response) => {
  res.json("get category by id");
};

const createCategory = async (req = request, res = response) => {
  res.json("create a category");
};

const updateCategory = async (req = request, res = response) => {
  res.json("update category");
};

const deleteCategory = async (req = request, res = response) => {
  res.json("delete a category");
};
module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
