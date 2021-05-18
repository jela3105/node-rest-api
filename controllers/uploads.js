const { response } = require("express");
const { uploadFile } = require("../helpers/upload-file");
const { User, Product } = require("../models");

const postImage = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }
  const name = await uploadFile(req.files);
  res.json({ name });
};

const updateImage = async (req, res = response) => {
  const { id, collection } = req.params;
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res
          .status(400)
          .json({ msg: `The user with the id ${id} not exists` });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        console.log("no se encontro");
        return res
          .status(400)
          .json({ msg: `The product with the id ${id} not exists` });
      }
      break;
    default:
      return res.status(500).json({ msg: `collection not found` });
  }
  model.img = await uploadFile(req.files, undefined, collection);
  await model.save();
  res.json(model);
};

module.exports = { postImage, updateImage };
