const { Router } = require("express");
const { check } = require("express-validator");

const { categoryExists } = require("../helpers/db-validators");
const { validateFields, validateJWT, hasRole } = require("../middlewares");

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const router = Router();

router.get("/", getCategories);

router.get(
  "/:id",
  [
    check("id", "Is not a valid ID").isMongoId(),
    check("id").custom(categoryExists),
    validateFields,
  ],
  getCategoryById
);
router.post(
  "/",
  [
    validateJWT,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("name", "The name is required").not().isEmpty(),
    validateFields,
  ],
  createCategory
);
router.put(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "Is not a valid ID").isMongoId(),
    check("id").custom(categoryExists),
    check("name", "The name is required").not().isEmpty(),
    validateFields,
  ],
  updateCategory
);
router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "Is not a valid ID").isMongoId(),
    check("id").custom(categoryExists),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
