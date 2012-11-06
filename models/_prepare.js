
/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    types = require('mongoose-3x-types');

module.exports = function (app) {

  // Load additional fieldtypes.

  types.loadTypes(mongoose);

  /**
   * Connect to mongodb.
   */

  var db = mongoose.createConnection(
    app.get('db host'),
    app.get('db collection'),
    app.get('db port')
  );

  // Report success / failure

  if ('test' !== app.get('env')) {
    db.on('error', console.error.bind(console, 'MongoDb, connection error: '));
    db.on('open', console.error.bind(console, 'Connected to MongoDb'));
  }

  // Make the connection available through `app`

  app.set('db', db);

};

