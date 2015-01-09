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
        fs   = require('fs'),
        rev  = require('gulp-rev');

    var c = require('./config');

    var targetFolderJs = c.TARGET_FOLDER + '/' + c.TARGET_FOLDER_JS;
    var files = [ c.TARGET_FOLDER + '/' + c.TARGET_FOLDER_CSS + '/' + c.TARGET_FILE_CSS ]
      .concat(fs.readdirSync(targetFolderJs).map(function (f) {
        return targetFolderJs + '/' + f;
      }));

    return gulp.src(files, { base: path.join(process.cwd(), c.TARGET_FOLDER) })
      .pipe(rev())
      .pipe(gulp.dest(c.target()))
      .pipe(rev.manifest())
      .pipe(gulp.dest(c.target()));
  };
};

module.exports.deps = ['less', 'scripts'];
