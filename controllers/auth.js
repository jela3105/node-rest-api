const { response } = require("express");
const login = (req, res) => {
  res.json({
    msg: "Login ok",
  });
};

module.exports = {
  login,
};
