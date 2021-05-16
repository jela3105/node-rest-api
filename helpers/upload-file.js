const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  validExtensions = ["png", "jpg", "jpeg", "gif"],
  directory = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files.files;
    const shortName = file.name.split(".");
    const extension = shortName[shortName.length - 1];

    /*
    if (!validExtensions.includes(extension)) {
      return reject(
        `The extension ${extension} is not valid, ${validExtensions}`
      );
    }*/
    const tempName = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", directory, tempName);

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(uploadPath);
    });
  });
};

module.exports = {
  uploadFile,
};
