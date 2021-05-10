const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT } = require("../middlewares");

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post(
  "/",
  [
    validateJWT,
    check("name", "The name is required").not().isEmpty(),
    validateFields,
  ],
  createCategory
);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
