
module.exports = function (app) {

  var db = app.get('db'),
      Users = db.model('Users');

  // Index of users

  this.index = function (req, res) {
    Users.find(function (err, users) {
      if (err) return next(err);
      res.render('users/index', { users: users });
    });
  };

  // Form for creating new users

  this.new = function (req, res, next) {
    if (!req.session.user.isPublisher) {
      var err = new Error('You are not authorized to add new users');
      err.code = 401;
      return next(err);
    }
    var user = { name: {} };
    res.render('users/edit', { user: user });
  };

  // Add the user to MongoDb

  this.create = function (req, res) {
    var user = new Users(req.body);
    user.save(function (err) {
      if (err) console.error(err);
      if (err) return next(err);
      res.redirect('/users/');
    });
  };

  // Present the user

  this.show = function (req, res) {
    res.render('users/show', { user: req.user });
  };

  // Edit existing user

  this.edit = function (req, res) {
    res.render('users/edit', { user: req.user });
  };

  // Update the MongoDb-records of an existing user

  this.update = function (req, res) {
    if (req.body.password == '') delete req.body.password;
    delete req.body._id;
    delete req.body._method;
    Users.findByIdAndUpdate(req.user._id, req.body, function (err, user) {
      if (err || user === {}) return next(err);
      req.session.success = res.locals._.t('{username} was successfylly updated', {username: user.name.user});
      res.redirect('/users/');
    });
  };

  // Load a particular user.

  this.load = function (req, username, next) {
    Users.findOne({ 'name.user': username }, function (err, user) {
      if (err) return next(err);
      next(null, user);
    });
  };

  app.resource('users', this);

};

