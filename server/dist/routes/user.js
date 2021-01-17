"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _utils = require("../utils");

var _controllers = require("../controllers");

const router = (0, _express.Router)();
router.get('/user', _utils.jwtMiddleware, _controllers.getSelfContoller);
router.put('/user', _utils.jwtMiddleware, _controllers.updateSelfController);
router.delete('/user', _utils.jwtMiddleware, _controllers.deleteSelfController);
var _default = router;
exports.default = _default;