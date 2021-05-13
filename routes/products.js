const { Router } = require("express");
const { check } = require("express-validator");

const { productExists, isValidCategory } = require("../helpers/db-validators");
const { validateJWT, validateFields, isAdmin } = require("../middlewares");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const router = Router();

router.get("/", getProducts);
router.get(
  "/:id",
  [
    check("id", "Is not a valid ID").isMongoId(),
    check("id").custom(productExists),
    validateFields,
  ],
  getProductById
);
router.post(
  "/",
  [
    validateJWT,
    check("name", "The name is required").not().isEmpty(),
    check("category", "The category is required").not().isEmpty(),
    check("category", "Is not a valid ID").isMongoId(),
    check("category").custom(isValidCategory),
    validateFields,
  ],
  createProduct
);
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Is not a valid ID").isMongoId(),
    check("id").custom(productExists),
    validateFields,
  ],
  updateProduct
);
router.delete(
  "/:id",
  [
    validateJWT,
    isAdmin,
    check("id", "Is not a valid ID").isMongoId(),
    check("id").custom(productExists),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
