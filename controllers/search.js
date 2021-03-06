const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Category, Product } = require("../models");

const collectionsAllowed = ["users", "category", "products", "roles"];

const searchUsers = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }
  const regex = new RegExp(term, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ isActive: true }],
  });
  res.json({ results: users });
};

const searchCategory = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const category = await Category.findById(term)
      .populate("category", "name")
      .populate("user", "name");
    return res.json({
      results: category ? [category] : [],
    });
  }
  const regex = new RegExp(term, "i");
  const category = await Category.find({
    name: regex,
    isVisible: true,
  })
    .populate("category", "name")
    .populate("user", "name");
  res.json({ results: category });
};

const searchProduct = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const product = await Product.findById(term)
      .populate("user", "name")
      .populate("category", "name");
    return res.json({
      results: product ? [product] : [],
    });
  }
  const regex = new RegExp(term, "i");
  const product = await Product.find({ name: regex, avaible: true })
    .populate("category", "name")
    .populate("user", "name");
  res.json({ results: product });
};

const search = (req, res = response) => {
  const { collection, term } = req.params;
  if (!collectionsAllowed.includes(collection)) {
    return res
      .status(400)
      .json({ msg: `The collections allowed are: ${collectionsAllowed}` });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "category":
      searchCategory(term, res);
      break;
    case "products":
      searchProduct(term, res);
      break;
    case "roles":
      break;
    default:
      res.status(500).json({ msg: "The search for the item is not implement" });
  }
};
module.exports = { search };
