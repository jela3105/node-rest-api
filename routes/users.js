const { Router } = require("express");

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

router.post("/", postUsers);

router.delete("/", deleteUsers);

router.patch("/", patchUsers);
module.exports = router;
