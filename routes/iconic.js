
/**
 * Module dependencies.
 */

var fs = require('fs');

module.exports = function (app) {

  app.get('/iconic', function (req, res) {

    fs.readFile(app.get('root') + 'public/css/iconic.css', 'utf-8', function (err, str) {
      if (err) throw err;
      var lines = str.split('\n'),
          icons = [];

      lines
        .filter(function (line) {
          return line.match(/^.iconic\./);
        })
        .map(function (line) {
          return line.replace(/^.iconic.([^\:]+)\:.+$/, '$1');
        })
        .forEach(function (line) {
          icons.push(line);
        });

      process.nextTick(function () {
        res.render('iconic', {icons: icons});
      });
    });

  });

};

