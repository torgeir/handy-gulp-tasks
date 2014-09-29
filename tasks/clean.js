module.exports = function (minify) {

  return function clean (fn) {

    var del = require('del');

    var c = require('./config');

    del(c.TARGET_FOLDER, fn);
  };
};
