const { response, request } = require("express");

const { Category } = require("../models/");

const getCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { isVisible: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    await Category.find(query)
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);
  res.json({ total, categories });
};

const getCategoryById = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");
  res.json(category);
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

//TODO: rename category
const updateCategory = async (req = request, res = response) => {
  res.json("update category");
};

//TODO: change is visible to false
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
