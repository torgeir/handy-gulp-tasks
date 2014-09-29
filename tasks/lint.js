module.exports = function (minify) {

  return function lint () {

    var gulp   = require('gulp'),
        gulpif = require('gulp-if'),
        jshint = require('gulp-jshint'),
        notify = require('gulp-notify');

    var c = require('./config');

    var jshintNotifyOnError = notify(function (file) {
      if (!file.jshint) {
        return false;
      }

      if (file.jshint.success) {
        return false; // Don't show something if success
      }

      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join("\n");
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    });

    return gulp.src(c.all(c.FOLDER_JS))
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(gulpif(!minify, jshintNotifyOnError));
  };
};
