const { response } = require("express");
const search = (req, res = response) => {
  res.json({ msg: "search request" });
};
module.exports = { search };