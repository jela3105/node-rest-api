const Role = require("../models/role");
const User = require("../models/user");

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
module.exports = {
  isValidRole,
  emailExists,
  existsUserById,
};
