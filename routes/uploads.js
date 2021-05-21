const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, validateFile } = require("../middlewares");
const {
  postImage,
  updateImageCloudinary,
  getImage,
} = require("../controllers/uploads");
const { allowedCollectios } = require("../helpers");

const router = Router();
router.post("/", validateFile, postImage);
router.put(
  "/:collection/:id",
  [
    validateFile,
    check("id", "Is not a valid id").isMongoId(),
    check("collection").custom((c) =>
      allowedCollectios(c, ["users", "products"])
    ),
    validateFields,
  ],
  updateImageCloudinary
);

router.get(
  "/:collection/:id",
  [
    check("id", "Is not a valid id").isMongoId(),
    check("collection").custom((c) =>
      allowedCollectios(c, ["users", "products"])
    ),
    validateFields,
  ],
  getImage
);

module.exports = router;
