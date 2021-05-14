const { Router } = require("express");
const { search } = require("../controllers/search");

router = Router();

router.get("/:coleccion/:term", search);

module.exports = router;
