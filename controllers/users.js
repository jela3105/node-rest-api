const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const getUsers = (req = request, res = response) => {
  const { q, page = 1, apikey } = req.query;
  res.json({ msg: "get API - cotroller", q, page, apikey });
};

const putUsers = async (req, res) => {
  const { id } = req.params;
  const { email, password, google, ...rest } = req.body;

  //TODO: validate in data base if user exists
  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.status(400).json({ msg: "put request", user });
};

const postUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({ user });
};

const deleteUsers = (req, res) => {
  res.json({ msg: "delete request" });
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
