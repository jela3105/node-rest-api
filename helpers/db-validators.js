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

module.exports = {
  isValidRole,
  emailExists,
};
