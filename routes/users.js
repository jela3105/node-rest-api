const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

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
    check("role", "The role is not valid").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validateFields,
  ],
  postUsers
);

router.delete("/", deleteUsers);

router.patch("/", patchUsers);
module.exports = router;
