module.exports = function () {

  return function test () {
    var gulp  = require('gulp'),
        mocha = require('gulp-mocha'),
        path  = require('path');

    var c = require('./config');

    var files = [
      path.join(c.FOLDER_TESTS, '*-test.js'),
      path.join(c.FOLDER_TESTS, '**', '*-test.js')
    ];

    return gulp.src(files, { read: false })
      .pipe(mocha({ reporter: 'min' }));
  };
};
