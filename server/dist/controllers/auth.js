"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signupController = exports.loginController = void 0;

var _xmlify = _interopRequireDefault(require("xmlify"));

var _utils = require("../utils");

var _user = require("../models/user");

const loginController = async (req, res) => {
  const password = req.body.root.password[0];
  const username = req.body.root.username[0];

  try {
    const user = await _user.User.findOne({
      username
    });

    if (!user) {
      throw new Error("User doesn't exists");
    }

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      throw new Error("Credantials doesn't match");
    }

    const tokens = (0, _utils.createTokens)(user._id);
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send((0, _xmlify.default)({
      user,
      ...tokens
    }));
  } catch (error) {
    res.setHeader('Content-Type', 'text/xml');
    res.status(404).send((0, _xmlify.default)({
      message: error.message
    }));
  }
};

exports.loginController = loginController;

const signupController = async (req, res) => {
  const password = req.body.root.password[0];
  const username = req.body.root.username[0];

  try {
    const existingUser = await _user.User.findOne({
      username
    });

    if (existingUser) {
      return res.status(404).send((0, _xmlify.default)({
        message: 'User already exists'
      }));
    }

    const newUser = new _user.User({
      username,
      password
    });
    await newUser.save();
    const tokens = (0, _utils.createTokens)(newUser._id);
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send((0, _xmlify.default)({
      user: newUser,
      ...tokens
    }));
  } catch (error) {
    res.setHeader('Content-Type', 'text/xml');
    res.status(404).send((0, _xmlify.default)({
      message: error.message
    }));
  }
};

exports.signupController = signupController;