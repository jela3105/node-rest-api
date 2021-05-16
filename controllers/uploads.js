const path = require("path");
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
  res.json({ extension });
  /*
  uploadPath = path.join(__dirname, "../uploads/" + file.name);

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json({ msg: "File uploaded to " + uploadPath });
  });*/
};

module.exports = { uploadFile };
