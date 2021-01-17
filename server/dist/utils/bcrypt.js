"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

const hashPassword = async password => {
  const salt = await _bcrypt.default.genSalt(10);
  const PWHash = await _bcrypt.default.hash(password, salt);
  return PWHash;
};

exports.hashPassword = hashPassword;