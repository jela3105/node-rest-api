const { response } = require("express");

const uploadFile = (req, res = response) => {
  res.json({ msg: "hello word" });
};

module.exports = { uploadFile };
