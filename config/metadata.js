
/**
 * Module dependencies.
 */

var pkg = require('../package');

/**
 * Metadata to extract from package.json
 */

var metadata = [
  'name',
  'version',
  'author',
  'description',
  'keywords'
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
