const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, validateJWT } = require("../middlewares/");
const { login, googleSignIn, renovateToken } = require("../controllers/auth");

const router = Router();

router.post(
  "/login",
  [
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    validateFields,
  ],
  login
);
router.post(
  "/google",
  [
    check("id_token", "The id token is required").not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);
router.get("/", validateJWT, renovateToken);
module.exports = router;
