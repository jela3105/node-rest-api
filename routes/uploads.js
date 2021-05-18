const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { postImage } = require("../controllers/uploads");

const router = Router();
router.post("/", postImage);

module.exports = router;
