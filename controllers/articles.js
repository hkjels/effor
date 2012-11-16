
module.exports = function (app) {

  var db = app.get('db'),
      Articles = db.model('Articles'),
      Pages = db.model('Pages');

  // List all articles of the current page

  this.index = function (req, res) {
    Articles
      .find({page: req.page._id})
      .populate('page')
      .populate('author')
      .exec(function (err, articles) {
        if (err || articles === {}) return next(err);
        res.render('articles/index', { articles: articles });
      });
  };

  // Form for creating new articles

  this.new = function (req, res) {
    res.render('articles/edit', {
      page: req.page,
      article: {}
    });
  };

  // Add article to MongoDb

  this.create = function (req, res, next) {
    var cred = req.body;
    cred.author = req.session.user._id;
    cred.page = req.page._id;
    var article = new Articles(cred);
    article.save(function (err) {
      if (err) return next(err);
      Pages.findByIdAndUpdate(req.page._id, { $push: { articles: article._id } }, function (err, page) {
        var msg = 'You´ve successfylly added a new article titled {title}.';
        req.session.success = res.locals._.t(msg, { title: article.title });
        res.redirect('../');
      });
    })
  };


  this.show = function (req, res) {
    switch (req.type) {
      case 'json' : return res.json(req.article);
      case 'html' :
      default : return res.render('articles/show', {
        article: req.article,
        page: req.page
      });
    }
  }


  this.edit = function (req, res) {
    res.render('articles/edit', {
      article: req.article,
      page: req.page
    });
  };


  this.update = function (req, res) {
    Articles
      .findByIdAndUpdate(req.article._id, req.body, function (err, article) {
        if (err) return next(err);
        var msg = 'You successfully updated the article titled {title}.';
        req.session.success = res.locals._.t(msg, { title: article.title })
        res.redirect(req.page.path + article.path);
      });
  };


  this.load = function (req, title, next) {
    title = new RegExp('^' + decodeURI(title) + '$', 'i');
    Articles
      .findOne({ title: { $regex: title } })
      .populate('author')
      .exec(function (err, article) {
        if (err) return next(err);
        next(null, article);
      });
  };

  return this;

}

