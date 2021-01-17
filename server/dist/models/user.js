"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _bcrypt2 = require("../utils/bcrypt");

const UserSchema = new _mongoose.default.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
UserSchema.pre('save', async function (next) {
  try {
    this.password = await (0, _bcrypt2.hashPassword)(this.password);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await _bcrypt.default.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

UserSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    delete ret['password'];
    return ret;
  }
});

const User = _mongoose.default.model('user', UserSchema);

exports.User = User;