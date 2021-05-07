const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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
      user,
      token,
    });
  } catch (e) {
    res
      .status(500)
      .json({ msg: "Sorry, something gone wrong at the database" });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const googleUser = await googleVerify(id_token);
    console.log(googleUser);
    res.json({ msg: "Everything is ok" });
  } catch (error) {
    res.status(400).json({ msg: "Google token is not valid" });
  }
};

module.exports = {
  login,
  googleSignIn,
};
