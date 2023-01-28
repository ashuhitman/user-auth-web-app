const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: {
    type: String,
    reuired: true,
  },
  password: {
    type: String,
    reuired: true,
  },
  firstName: {
    type: String,
    reuired: true,
  },
  lastName: {
    type: String,
    reuired: true,
  },
  username: {
    type: String,
    reuired: true,
  },
  gender: {
    type: String,
    reuired: true,
  },
  country: {
    type: String,
    reuired: true,
  },
  submission: {
    type: Number,
    default: 1,
  },
  regId: {
    type: String,
    reuired: true,
  },
  dtime: {
    type: Date,
    default: new Date().toDateString(),
  },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
