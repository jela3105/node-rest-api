const dbValidators = require("./db-validators");
const generateJWT = require("./generateJWT");
const googleVerify = require("./google-vefify");
const uploadFile = require("./uploadFile");

modole.exports = {
  ...dbValidators,
  ...generateJWT,
  ...googleVerify,
  ...uploadFile,
};
