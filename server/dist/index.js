"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressXmlBodyparser = _interopRequireDefault(require("express-xml-bodyparser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = require("./routes");

var _config = _interopRequireDefault(require("./config"));

const app = (0, _express.default)();

_mongoose.default.connect(_config.default.DB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use((0, _cors.default)({
  origins: '*'
}));
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
app.use((0, _expressXmlBodyparser.default)());
app.use(_express.default.static(_path.default.join(__dirname, '../../client/build')));
app.use('/api', _routes.authRoutes);
app.use('/api', _routes.userRoutes);
app.get('*', async (req, res) => {
  res.sendFile(_path.default.join(__dirname, '../../client/build', 'index.html'));
});
app.listen(_config.default.PORT, () => console.log(`Server running at http://localhost:${_config.default.PORT}`));