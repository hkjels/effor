
/**
 * Module dependencies.
 */

var express = require('express'),
    flatten = require('flat').flatten,
    normalize = require('path').normalize,
    preferences = require('../package').config;

/**
 * Express configurations.
 */

module.exports = function (app) {

  // Flatten the preferences for use with `app.set`,

  preferences = flatten(preferences, { delimiter: ' ' });

  // General

  app.configure(function () {
    for (var key in preferences) {
      if (!preferences.hasOwnProperty(key)) continue;
      app.set(key, preferences[key]);
    }
    app.set('root', normalize(__dirname + '/../'));
    app.set('views', normalize(app.get('root') + 'views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser(app.get('salt')));
    app.use(express.session());
    app.disable('verbose');
  });

  // Development server

  app.configure('development', function () {
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
    app.enable('verbose');
  });
}

