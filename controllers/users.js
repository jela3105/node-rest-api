const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { isActive: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    await User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({ total, users });
};

const putUsers = async (req, res) => {
  const { id } = req.params;
  const { _id, email, password, google, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.status(400).json({ user });
};

const postUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({ user });
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { isActive: false });
  res.json(user);
};

const patchUsers = (req, res) => {
  res.status(200).json({ msg: "patch request" });
};
module.exports = {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
};
