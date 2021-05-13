const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ msg: "Token not found" });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Not a valid token, user does not exists" });
    }
    if (!user.isActive) {
      return res.status(401).json({ msg: "Not valid token, unactive user" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Not a valid token" });
  }
};

module.exports = {
  validateJWT,
};
