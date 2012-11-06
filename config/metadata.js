
/**
 * Module dependencies.
 */

var pkg = require('../package');

/**
 * Metadata to extract from package.json
 */

var metadata = [
  'name',
  'author',
  'description',
  'homepage',
  'keywords',
  'version'
];

module.exports = function (app) {

  // Add metadata to application-locals

  app.locals.meta = {};
  metadata.forEach(function (key) {
    app.locals.meta[key] = pkg[key];
  });

  app.use(function (req, res, next) {
    res.locals.title = app.locals.meta.name;
    next();
  });

};
