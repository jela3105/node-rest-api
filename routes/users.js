const { Router } = require("express");
const { check } = require("express-validator");

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
  [check("email", "The email is not valid").isEmail()],
  postUsers
);

router.delete("/", deleteUsers);

router.patch("/", patchUsers);
module.exports = router;
