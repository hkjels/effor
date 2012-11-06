
var app = require('../server'),
    Users = app.models.Users;

describe('Users', function () {
  var user;

  beforeEach(function (done) {
    var cred = {
      'name.full': 'Henrik Kjelsberg',
      'name.user': 'hkjels',
      'email': 'hkjels@me.com',
      'password': 'password'
    };
    user = new Users(cred).save(done);
  });

  afterEach(function (done) {
    Users.remove(done);
  });

  it ('should contain some personal information', function (done) {
    Users.findOne(function (err, user) {
      user.name.first.should.equal('Henrik');
      user.name.last.should.equal('Kjelsberg');
      user.email.should.equal('hkjels@me.com');
      user.password.should.not.equal('password');
      done();
    });
  });

  it ('should be able to authenticate with valid credentials', function (done) {
    Users.authenticate('hkjels@me.com', 'password', function (err, user) {
      user.name.full.should.equal('Henrik Kjelsberg');
      user.password.should.match(/^\*{8}$/);
      done();
    });
  });

  it ('should not be able to authenticate with invalid credentials', function (done) {
    Users.authenticate('hkjels@me.com', 'swada', function (err, user) {
      err.should.exist;
      done();
    });
  });

});

