"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.js2xml = exports.xml2js = void 0;

var _xmlJs = _interopRequireDefault(require("xml-js"));

const options = {
  compact: true,
  spaces: 2
};

const xml2js = xml => _xmlJs.default.xml2js({
  root: xml
}, { ...options
});

exports.xml2js = xml2js;

const js2xml = js => {
  const xml = _xmlJs.default.js2xml({
    root: js
  }, { ...options
  });

  return xml;
};

exports.js2xml = js2xml;