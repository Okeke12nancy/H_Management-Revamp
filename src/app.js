const express = require("express");
require("express-async-errors");

const indexMiddleware = require("./middlewares/index.middleware");

const app = express();

indexMiddleware(app);

exports.app = app;