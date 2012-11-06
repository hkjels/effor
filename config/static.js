
/**
 * Module dependencies.
 */

var express = require('express'),
    nib = require('nib'),
    stylus = require('stylus');

/**
 * Configure serving of static files.
 */

module.exports = function (app) {

  function stylusNib (str, path) {
    return stylus(str).set('filename', path).use(nib());
  }

  app.configure(function () {
    var pub;
    app.use(stylus.middleware({
      src: pub = app.get('root') + 'public',
      compile: stylusNib
    }));
    app.use(express.static(pub));
  });

}

