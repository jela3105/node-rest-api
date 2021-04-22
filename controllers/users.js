const { response } = require("express");

const getUsers = (req, res = response) => {
  res.json({ msg: "get API - cotroller" });
};
const putUsers = (req, res) => {
  res.status(400).json({ msg: "put request" });
};
const postUsers = (req, res) => {
  res.status(201).json({ msg: "post request" });
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
