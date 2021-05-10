const { response, request } = require("express");

const { Category } = require("../models/");

const getCategories = async (req = request, res = response) => {
  res.json("get all categories");
};
const getCategoryById = async (req = request, res = response) => {
  res.json("get category by id");
};

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    return res.status(400).json({
      msg: `The category ${name} is already used`,
    });
  }
  const data = { name, user: req.user._id };
  const category = new Category(data);
  await category.save();
  res.status(201).json(category);
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
