"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "authRoutes", {
  enumerable: true,
  get: function () {
    return _auth.default;
  }
});
Object.defineProperty(exports, "userRoutes", {
  enumerable: true,
  get: function () {
    return _user.default;
  }
});

var _auth = _interopRequireDefault(require("./auth"));

var _user = _interopRequireDefault(require("./user"));