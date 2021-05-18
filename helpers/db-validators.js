const { Role, User, Category, Product } = require("../models");

const isValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`The ${role} role not exists`);
  }
};

const emailExists = async (email = "") => {
  const emailAlreadyUsed = await User.findOne({ email });
  if (emailAlreadyUsed) {
    throw new Error(`The email ${email} has already been registered`);
  }
};
const existsUserById = async (id = "") => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`The id ${id} does not exists`);
  }
};

const categoryExists = async (id = "") => {
  const categoryExists = await Category.findById(id);
  if (!categoryExists) {
    throw new Error(`The id ${id} does not exists`);
  }
};
const productExists = async (id = "") => {
  const productExists = await Product.findById(id);
  if (!productExists) {
    throw new Error(`The product with id ${id} does not exists`);
  }
};
const isValidCategory = async (category = "") => {
  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    throw new Error(`The category ${category} does not exists`);
  }
};

const allowedCollectios = (collection = "", collections = []) => {
  const collectionIncluded = collections.includes(collection);
  if (!collectionIncluded) {
    throw new Error(
      `The collection ${collection} is not allowed, ${collections}`
    );
  }
  return true;
};
module.exports = {
  categoryExists,
  emailExists,
  existsUserById,
  isValidCategory,
  isValidRole,
  productExists,
  allowedCollectios,
};
