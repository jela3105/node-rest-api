const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { response } = require("express");

const uploadFile = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }
  const { file } = req.files;
  const shortName = file.name.split(".");
  const extension = shortName[shortName.length - 1];

  const validExtensions = ["png", "jpg", "jpeg", "gif"];
  if (!validExtensions.includes(extension)) {
    return res.status(400).json({
      msg: `The extension ${extension} is not valid, ${validExtensions}`,
    });
  }
  const tempName = uuidv4() + "." + extension;
  const uploadPath = path.join(__dirname, "../uploads/" + tempName);

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json({ msg: "File uploaded to " + uploadPath });
  });
};

module.exports = { uploadFile };
