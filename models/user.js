// name, email, password, img, role, isActive, createdByGoogle

const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "The name is mandatory"],
  },
  email: {
    type: String,
    required: [true, "The email is mandatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is mandatory"],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdByGoogle: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Users", UserSchema);