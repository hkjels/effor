
var app = require('../server'),
    Articles = app.models.Articles,
    Pages = app.models.Pages;

describe('Pages', function () {
  var page, article;

  beforeEach(function (done) {
    page = new Pages({
      'path': '/',
      'title': 'Home',
      'visible': false
    }).save(done);
  });

});


