"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtMiddleware = exports.createTokens = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _xmlify = _interopRequireDefault(require("xmlify"));

var _config = _interopRequireDefault(require("../config"));

const jwtVerify = (token, secret) => new Promise((resolve, reject) => {
  _jsonwebtoken.default.verify(token, secret, (err, decoded) => {
    if (err) {
      reject(err);
    } else {
      resolve(decoded);
    }
  });
});

const createTokens = userId => {
  try {
    const accessToken = _jsonwebtoken.default.sign({
      userId
    }, _config.default.ACCESS_TOKEN.secret, _config.default.ACCESS_TOKEN.options);

    return {
      accessToken
    };
  } catch (error) {
    return {};
  }
};

exports.createTokens = createTokens;

const jwtMiddleware = async (req, res, next) => {
  var _req$headers$authoriz;

  const [bearer, token] = ((_req$headers$authoriz = req.headers.authorization) !== null && _req$headers$authoriz !== void 0 ? _req$headers$authoriz : '').split(' ');

  try {
    if (bearer && token) {
      _jsonwebtoken.default.verify(token, _config.default.ACCESS_TOKEN.secret, (err, decoded) => {
        if (err) {
          throw new Error(err.message);
        } else {
          req.userId = decoded.userId;
        }
      });
    } else {
      throw new Error('Invalid token');
    }
  } catch (error) {
    res.setHeader('Content-Type', 'text/xml');
    res.status(403).send((0, _xmlify.default)({
      message: error.message
    }));
  } finally {
    next();
  }
};

exports.jwtMiddleware = jwtMiddleware;