const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { postImage, updateImage } = require("../controllers/uploads");
const { allowedCollectios } = require("../helpers");

const router = Router();
router.post("/", postImage);
router.put(
  "/:collection/:id",
  [
    check("id", "Is not a valid id").isMongoId(),
    check("collection").custom((c) =>
      allowedCollectios(c, ["users", "products"])
    ),
    validateFields,
  ],
  updateImage
);

module.exports = router;
