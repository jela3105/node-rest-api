const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  isValidRole,
  emailExists,
  existsUserById,
} = require("../helpers/db-validators");

const {
  getUsers,
  putUsers,
  deleteUsers,
  postUsers,
  patchUsers,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);

router.put(
  "/:id",
  [
    check("id", "Is not a valid ID").isMongoId(),
    check("id").custom(existsUserById),
    check("role").custom(isValidRole),
    validateFields,
  ],
  putUsers
);

router.post(
  "/",
  [
    check("name", "The name is required").not().isEmpty(),
    check("password", "The password must have more than 6 characters").isLength(
      6
    ),
    check("email", "The email is not valid").isEmail(),
    check("role").custom(isValidRole),
    check("email").custom(emailExists),
    validateFields,
  ],
  postUsers
);

router.delete(
  "/:id",
  [
    check("id", "Is not a valid ID").isMongoId(),
    check("id").custom(existsUserById),
    validateFields,
  ],
  deleteUsers
);

router.patch("/", patchUsers);
module.exports = router;
