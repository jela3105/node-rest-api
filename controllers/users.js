const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/user");

const getUsers = (req = request, res = response) => {
  const { q, page = 1, apikey } = req.query;
  res.json({ msg: "get API - cotroller", q, page, apikey });
};

const putUsers = (req, res) => {
  res.status(400).json({ msg: "put request" });
};

const postUsers = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({
      msg: "The email already exists",
    });
  }

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
