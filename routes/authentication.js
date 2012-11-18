
/**
 * Authentication-credentials.
 */

module.exports = function (app) {

  var db = app.get('db'),
      Users = db.model('Users');

  /**
   * Login
   */

  app.get('/login/', function (req, res) {
    res.render('login');
  });

  /**
   * Authenticate login-credentials
   */

  app.post('/login/', function (req, res) {
    Users.authenticate(req.body.email, req.body.password, function(err, user) {
      if (user) {
        Users.findByIdAndUpdate(user._id, { isOnline: true }, function (err, user) {
          req.session.regenerate(function(){
            req.session.user = user;
            req.session.success = res.locals._.t('Velkommen {name}', {name: user.name.first});
            res.redirect('back');
          });
        });
      } else {
        req.session.error = 'Feil brukernavn eller passord';
        res.redirect('/login/');
      }
    });
  });

  /**
   * Logout
   */

  app.get('/logout/', function (req, res) {
    if (!req.session.user) return res.redirect('/');
    Users.findByIdAndUpdate(req.session.user._id, { isOnline: false }, function (err, user) {
      req.session.destroy(function () {
        res.redirect('/');
      });
    });
  });

}

