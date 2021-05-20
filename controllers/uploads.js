const { response } = require("express");
const path = require("path");
const fs = require("fs");
const { uploadFile } = require("../helpers/upload-file");
const { User, Product } = require("../models");

const postImage = async (req, res = response) => {
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

  if (model.image) {
    const imagePath = path.join(
      __dirname,
      "../uploads/",
      collection,
      model.image
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  model.image = await uploadFile(req.files, undefined, collection);
  await model.save();
  res.json(model);
};

const getImage = (req, res = response) => {
  res.json(req.params);
};

module.exports = { postImage, updateImage, getImage };
