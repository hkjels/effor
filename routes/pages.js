
module.exports = function (app) {

  var db = app.get('db'),
      Pages = db.model('Pages');

  // Form for creating new pages

  this.new = function (req, res) {
    res.render('pages/edit', { page: {} });
  };

  // Save the page created with `pages.new` to
  // MongoDb and redirect to the created page.

  this.create = function (req, res, next) {
    var page = new Pages(req.body);
    page.save(function (err) {
      if (err) return next(err);
      res.redirect('/pages/' + title.toLowerCase() + '/');
    });
  };

  this.edit = function (req, res) {
    res.render('pages/edit', { page: req.page });
  };


  this.update = function (req, res) {
    Pages.findByIdAndUpdate(req.page._id, req.body, function (err, page) {
      if (err) return next(err);
      res.redirect('/pages/');
    });
  };

  // List existing pages. (sitemap)

  this.index = {
    json: function (req, res) {},

    html: function (req, res, next) {
      Pages.find(function (err, pages) {
        if (err) throw err;
        res.render('pages/index', { pages: pages });
      });
    }
  };

  // Show a particular page
  // Additionally, it populates with articles so
  // one can easily browse them.

  this.show = function (req, res, next) {
    switch (req.format) {
      case 'json' : return res.json(req.page);
      case 'html' :
      default: res.render('pages/page', { page: req.page });
    }
  };

  /**
   * Load a particular page and populate it.
   */

  this.load = function (req, title, next) {
    title = new RegExp('^' + title + '$', 'i');
    Pages
      .findOne({ title: { $regex: title }})
      .populate('articles')
      .exec(function (err, page) {
        if (err) return next(err);
        next(null, page);
      });
  };

  app.all('/pages*', function (req, res, next) {
    Pages
      .find({})
      .exec(function (err, pages) {
        if (err) throw err;
        pages = pages.sort();
        res.locals.pages = pages;
        next();
      });
  });

  var pages = app.resource('pages', this);
  pages.add(require('./articles')(app));

};

