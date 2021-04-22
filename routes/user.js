const { Router } = require("express");

const router = Router();
router.get("/", (req, res) => {
  res.json({ msg: "get request" });
});

router.put("/", (req, res) => {
  res.status(400).json({ msg: "put request" });
});

router.post("/", (req, res) => {
  res.status(201).json({ msg: "post request" });
});

router.delete("/", (req, res) => {
  res.json({ msg: "delete request" });
});

router.patch("/", (req, res) => {
  res.status(200).json({ msg: "patch request" });
});
module.exports = router;
