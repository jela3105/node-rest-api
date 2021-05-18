const { response } = require("express");
const { uploadFile } = require("../helpers/upload-file");

const postImage = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }
  const name = await uploadFile(req.files);
  res.json({ name });
};

module.exports = { postImage };
