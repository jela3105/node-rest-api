const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { response } = require("express");
const { uploadFile } = require("../helpers/upload-file");
const { User, Product } = require("../models");

const postImage = async (req, res = response) => {
  const name = await uploadFile(req.files);
  res.json({ name });
};

const updateImageCloudinary = async (req, res = response) => {
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
        return res
          .status(400)
          .json({ msg: `The product with the id ${id} not exists` });
      }
      break;
    default:
      return res
        .status(500)
        .json({ msg: `collection ${collection} not found` });
  }

  if (model.image) {
    const nameSplit = model.image.split("/");
    const name = nameSplit[nameSplit.length - 1];

    const [public_id] = name.split(".");
    cloudinary.uploader.destroy(public_id);
  }
  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.image = secure_url;
  await model.save();
  res.json(model);
};

const getImage = async (req, res = response) => {
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
    return res.json({ image: model.image });
  }

  res.sendFile(path.join(__dirname, "../assets/no-image.jpg"));
};

module.exports = { postImage, getImage, updateImageCloudinary };
