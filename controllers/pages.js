
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

  /**
   * Will display the page flagged as frontpage.
   */

  this.index = function (req, res, next) {
    Pages
      .findOne({frontpage: true})
      .populate('articles')
      .exec(function (err, page) {
        if (err) throw err;
        res.render('pages/page', { page: page });
      });
  };

  // Show a particular page
  // Additionally, it populates with articles so
  // one can easily browse them.

  this.show = function (req, res, next) {
    console.log(req.page);
    res.render('pages/page', { page: req.page });
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
        req.page = page;
        next(null, page);
      });
  };

  /**
   * Make pages the top-level resource and
   * nest articles within.
   */

  return this;

};

