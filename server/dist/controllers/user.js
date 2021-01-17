"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteSelfController = exports.updateSelfController = exports.getSelfContoller = void 0;

var _xmlify = _interopRequireDefault(require("xmlify"));

var _user = require("../models/user");

var _utils = require("../utils");

const getSelfContoller = async (req, res) => {
  try {
    const user = await _user.User.findOne({
      _id: req.userId
    }).select('-password');
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send((0, _xmlify.default)(user, 'user'));
  } catch (error) {
    res.setHeader('Content-Type', 'text/xml');
    res.status(404).send((0, _xmlify.default)({
      message: error.message
    }));
  }
};

exports.getSelfContoller = getSelfContoller;

const updateSelfController = async (req, res) => {
  const updateData = {
    username: req.body.root.username[0],
    password: req.body.root.password[0]
  };

  try {
    if (!Boolean(updateData.password.length)) {
      delete updateData.password;
    } else {
      updateData.password = await (0, _utils.hashPassword)(updateData.password);
    }

    const user = await _user.User.findOneAndUpdate({
      _id: req.userId
    }, updateData, {
      new: true
    }).select('-password');
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send((0, _xmlify.default)(user, 'user'));
  } catch (error) {
    res.setHeader('Content-Type', 'text/xml');
    res.status(404).send((0, _xmlify.default)({
      message: error.message
    }));
  }
};

exports.updateSelfController = updateSelfController;

const deleteSelfController = async (req, res) => {
  try {
    const user = await _user.User.findOne({
      _id: req.userId
    });

    if (!user) {
      throw new Error("User doesn't exists");
    }

    await _user.User.deleteOne({
      _id: user._id
    });
    res.status(200).send();
  } catch (error) {
    res.setHeader('Content-Type', 'text/xml');
    res.status(404).send((0, _xmlify.default)({
      message: error.message
    }));
  }
};

exports.deleteSelfController = deleteSelfController;