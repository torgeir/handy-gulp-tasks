var connect     = require('connect'),
    fs          = require('fs'),
    path        = require('path'),
    mime        = require('mime'),
    serveStatic = require('serve-static'),
    compression = require('compression');

var oneDay = 86400000,
    oneYear = oneDay * 365;

var PORT = process.env.PORT || 3000;

var c = require('./config');

connect()
  .use(compression())
  .use(serveStatic(__dirname + c.TARGET_FOLDER, { maxAge: oneYear }))
  .listen(PORT, function () {
    console.log(' listening on', PORT);
  });
