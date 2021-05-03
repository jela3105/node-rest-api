const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User / Password incorrect - email" });
    }

    if (!user.isActive) {
      return res
        .status(400)
        .json({ msg: "User / Password incorrect - not active" });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ msg: "User / Password incorrect - incorrect" });
    }

    const token = await generateJWT(user.id);
    res.json({
      msg: "Login ok",
      token,
    });
  } catch (e) {
    res
      .status(500)
      .json({ msg: "Sorry, something gone wrong at the database" });
  }
};

module.exports = {
  login,
};
