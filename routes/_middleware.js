
/**
 * Module dependencies.
 */

var lingo = require('lingo'),
    moment = require('moment');


module.exports = function (app) {

  var db = app.get('db'),
      Pages = db.model('Pages');

  // Lingo

  app.use(function (req, res, next) {
    var lang = req.acceptedLanguages[0].replace(/\-.+/, '');
    req.language = lingo[lang || 'nb'];
    req.language.t = req.language.translate;
    res.locals._ = req.language;
    moment.lang(lang);
    res.locals.moment = moment;
    next();
  });

  // Session

  app.use(function (req, res, next) {
    req.session.user = req.session.user || {};
    res.locals.session = req.session;
    next();
  });

  // Messages

  app.use(function(req, res, next){
    var err = req.session.error,
        msg = req.session.success,
        inf = req.session.info;
    req.session.error = req.session.success = req.session.inf = null;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (inf) res.locals.message = '<p class="msg info">' + msg + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
  });

  // Verbose

  app.use(function (req, res, next) {
    var verbose = false;
    if ('development' !== app.get('env')) verbose = true;
    res.locals.verbose = verbose;
    next();
  });

  // Execute routes
  // It is important that routes are executed before
  // errors are handled.

  function restrict(req, res, next) {
    if (!req.session.user.isPublisher) {
      req.session.error = 'You need to be authorized in order to complete this request.';
      res.redirect('/login/');
    }
    next();
  }

  // Restricted access

  app.all(/(edit|new|create|update)/gi, restrict);

  // Retrieve pages for navigation

  app.all('/*', function (req, res, next) {
    Pages
      .find({})
      .sort({frontpage: -1})
      .exec(function (err, pages) {
        if (err) throw err;
        res.locals.pages = pages;
        next();
      });
  });

  // Not found

  app.use(function (req, res, next) {
    var err = new Error('Not found');
    err.code = 404;

    // Error can resolve to both .json and .html

    res.status(err.code);
    switch (req.type) {
      case 'json' : return res.json(err);
      case 'html' :
      default: res.render('error', { error: err });
    }
  });

  app.use(app.router);

  // General error-handler

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.code || 500);

    switch (req.type) {
      case 'json' : return res.json(err);
      case 'html' :
      default : return res.render('error', { error: err });
    }
  });

};

