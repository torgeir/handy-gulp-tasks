module.exports = function (minify) {

  return function html () {

    var embedlr    = require('gulp-embedlr'),
        del        = require('del'),
        fs         = require('fs'),
        gulp       = require('gulp'),
        gulpif     = require('gulp-if'),
        replace    = require('gulp-replace'),
        minhtml    = require('gulp-htmlmin'),
        path       = require('path');

    var c = require('./config');

    var manifest, revisionsFile = c.target("rev-manifest.json");

    if (minify) {
      manifest = require(path.join('..', revisionsFile));
      for (var key in manifest) {
        // replace full path in key, so only app.js and app.css are left
        var newkey = key.replace(/.*\//, "");
        manifest[newkey] = manifest[key];
        delete manifest[key];
      }
    }

    return gulp.src(c.PATH_INDEX)
      .pipe(gulpif(!minify, embedlr()))
      .pipe(gulpif(minify, replace(/(js|css)\/([^.]+\.(?:js|css))/g, function (ignore, path, filename) {
        if (minify) {
          return manifest[filename];
        }
        return path + '/' + filename;
      })))
      .pipe(gulpif(minify, minhtml({
        // https://github.com/jonschlinkert/gulp-htmlmin
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      })))
      .pipe(gulp.dest(c.target()));
    };
};

module.exports.deps = ['rev'];
