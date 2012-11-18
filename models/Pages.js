
/**
 * Module dependencies.
 */

var Schema = require('mongoose').Schema,
    Types = Schema.Types;

module.exports = function (app) {

  var Pages = new Schema({
    articles: [{ type: Types.ObjectId, ref: 'Articles' }],
    added: { type: Date, default: Date.now },
    frontpage: { type: Boolean, default: false },
    inMenu: { type: Boolean, default: true },
    title: { type: String, min: 3, max: 30, unique: true }
  });

  Pages.virtual('path')
    .get(function () {
      var title = this.title.toLowerCase();
      return '/' + title;
    });

  return app.get('db').model('Pages', Pages);

};

