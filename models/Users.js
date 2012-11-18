
/**
 * Module dependencies.
 */

var Schema = require('mongoose').Schema,
    Types = Schema.Types,
    crypto = require('crypto'),
    os = require('os');


module.exports = function (app) {

  /**
   * Create a sha256-hash from a string.
   */

  function sha256 (str) {
    var hash = crypto.createHash('sha256');
    hash.update(str + app.get('salt'), 'utf8');
    return hash.digest('hex');
  }

  function md5 (str) {
    var hash = crypto.createHash('md5');
    hash.update(str, 'utf-8');
    return hash.digest('hex');
  }

  /**
   * Obscure string for safely retrieving password-field.
   */

  function obscure () { return Array(9).join('*'); }

  /**
   * Users schema
   */

  var Users = new Schema({
    name: {
      first: { type: String, trim: true },
      last: { type: String, trim: true },
      user: { type: String, unique: true, required: true, trim: true }
    },
    email: { type: Types.Email, unique: true, required: true, trim: true, lowercase: true },
    password: { type: String, set: sha256, get: obscure },
    isOnline: { type: Boolean, default: false },
    isPublisher : { type: Boolean, default: false },
    isEditor : { type: Boolean, default: false }
  });

  Users.virtual('photo')
    .get(function () {
      var url = 'http://www.gravatar.com/avatar/' + md5(this.email);
      return url;
    });

  Users.virtual('name.full')
    .get(function () {
      return this.name.first + ' ' + this.name.last;
    })
    .set(function (name) {
      name = name.split(' ');
      this.name.first = name.shift();
      this.name.last = name.shift();
    });

  Users.statics.authenticate = function (email, password, next) {
    var credentials = {
      email: email,
      password: sha256(password)
    };

    this.findOne(credentials, function (err, user) {
      if (err) return next(err);
      if (!user) err = new Error('Could not authenticate user');
      next(err, user);
    });
  };

  return app.get('db').model('Users', Users);

};
