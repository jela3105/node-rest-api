const dbValidators = require("./db-validators");
const generateJWT = require("./generateJWT");
const googleVerify = require("./google-vefify");
const uploadFile = require("./upload-file");

modole.exports = {
  ...dbValidators,
  ...generateJWT,
  ...googleVerify,
  ...uploadFile,
};
