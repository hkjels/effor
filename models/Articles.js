
/**
 * Module dependencies.
 */

var Schema = require('mongoose').Schema,
    Types = Schema.Types,
    md = require('marked');


module.exports = function (app) {

  /**
   * Number of columns the article should span.
   */

  var columnNum = ['four', 'eight', 'twelve', 'sixteen'];

  var Articles = new Schema({
    author: { type: Types.ObjectId, ref: 'Users' },
    columns: { type: String, 'enum': columnNum, default: 'sixteen' },
    markdown: { type: String, min: 10 },
    page: { type: Types.ObjectId, ref: 'Pages' },
    published: { type: Date, 'default': Date.now },
    tags: [{ type: String, min: 2, max: 30 }],
    title: { type: String, min: 3, max: 100, required: true, trim: true, unique: true }
  });

  Articles.virtual('path')
    .get(function () {
      var title = this.title.toLowerCase();
      return 'articles/' + title + '/';
    });

  Articles.virtual('html')
    .get(function () {
      return md(this.markdown);
    });

  return app.get('db').model('Articles', Articles);

}

