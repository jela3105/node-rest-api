const { response } = require("express");
const collectionsAllowed = ["users", "category", "products", "roles"];
const search = (req, res = response) => {
  const { collection, term } = req.params;
  if (!collectionsAllowed.includes(collection)) {
    return res
      .status(400)
      .json({ msg: `The collections allowed are: ${collectionsAllowed}` });
  }
  res.json({ collection, term });
};
module.exports = { search };
