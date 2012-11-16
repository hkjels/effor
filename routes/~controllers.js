
module.exports = function (app) {

  var users = app.resource('users', app.controllers.users),
      articles = app.resource('articles', app.controllers.articles),
      pages = app.resource(app.controllers.pages);

  // Nest articles within page.

  pages.add(articles);

};

