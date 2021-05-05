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

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res
        .status(500)
        .json({ msg: "Wants to verfy role without validate token" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The service requires one of the following roles ${roles}`,
      });
    }
    next();
  };
};
module.exports = {
  hasRole,
  isAdmin,
};
