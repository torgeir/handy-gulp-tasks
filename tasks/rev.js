module.exports = function (minify) {

  if (!minify) {
    return function (fn) {
      // Don't add hashes to files names if we're not minifying
      return fn();
    };
  }

  return function revisions () {

    var gulp = require('gulp'),
        path = require('path'),
        rev  = require('gulp-rev');

    var c = require('./config');

    var files = c.FILES_REV.map(function (conf) {
      return c.target(conf.entryPath);
    });

    return gulp.src(files, { base: path.join(process.cwd(), c.TARGET_FOLDER) })
      .pipe(rev())
      .pipe(gulp.dest(c.target()))
      .pipe(rev.manifest())
      .pipe(gulp.dest(c.target()));
  };
};

module.exports.deps = ['less', 'scripts'];
