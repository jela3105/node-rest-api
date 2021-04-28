const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const Role = require("../models/role");

const {
  getUsers,
  putUsers,
  deleteUsers,
  postUsers,
  patchUsers,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);

router.put("/", putUsers);

router.post(
  "/",
  [
    check("name", "The name is required").not().isEmpty(),
    check("password", "The password must have more than 6 characters").isLength(
      6
    ),
    check("email", "The email is not valid").isEmail(),
    check("role").custom(async (role = "") => {
      const roleExists = await Role.findOne({ role });
      if (!roleExists) {
        throw new Error(`The ${role} role not exists`);
      }
    }),
    validateFields,
  ],
  postUsers
);

router.delete("/", deleteUsers);

router.patch("/", patchUsers);
module.exports = router;
