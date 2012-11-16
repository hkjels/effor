
/**
 * Module dependencies.
 */

var express = require('express'),
  load = require('express-load'),
  Resource = require('express-resource'),
  app = module.exports = express();

/**
 * Load application essentials.
 */

load('config')
  .then('i18n')
  .then('models')
  .then('controllers')
  .then('routes')
  .into(app);

