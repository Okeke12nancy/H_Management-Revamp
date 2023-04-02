const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const asyncError = require('./errors.middlewares');
const indexRoutes = require('../routers/index.routes');

require('../db/mongoose.db')();

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());
  indexRoutes(app);

  app.use(asyncError);
};