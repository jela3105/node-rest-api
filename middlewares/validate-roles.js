const { response } = require("express");
const isAdmin = (req, res = response, next) => {
  if (!req.user) {
    return res
      .status(500)
      .json({ msg: "Wants to verfy role without validate token" });
  }

  const { role, name } = req.user;
  if (role !== "ADMIN_ROLE") {
    return res
      .status(401)
      .json({ msg: `${name} is not admin, the action can not be done` });
  }

  next();
};

module.exports = {
  isAdmin,
};
