
/**
 * Module dependencies.
 */

var http = require('http'),
    app = module.exports = require('./app');

/**
 * Server instance.
 */

var server = http.createServer(app);

/**
 * Make server listen for incoming requests.
 */

if (!module.parent) server.listen(app.get('port'), function () {
  console.log('http://localhost:' + app.get('port') + '/');
});

