module.exports = function (minify) {

  return function scripts () {

    var buffer     = require('vinyl-buffer'),
        browserify = require('browserify'),
        es6ify     = require('es6ify'),
        mkdirp     = require('mkdirp'),
        gulp       = require('gulp'),
        gulpif     = require('gulp-if'),
        source     = require('vinyl-source-stream'),
        uglify     = require('gulp-uglify'),
        watchify   = require('watchify');

    var c = require("./config");

    es6ify.traceurOverrides = {
      experimental: true,
      blockBinding: true,
      asyncFunctions: true
    };

    var watch = process.env.GULP_IS_WATCH;

    var bundler = browserify(es6ify.runtime, {
      debug: !minify, // source maps
      cache: {},
      packageCache: {},
      fullPaths: watch
    });

    if (watch) {
      bundler = watchify(bundler);
    }

    var targetFolder = c.TARGET_FOLDER + '/' + c.TARGET_FOLDER_JS;
    mkdirp.sync(targetFolder); // until http://github.com/substack/factor-bundle/issues/49

    bundler
      .add(c.PATH_JS_ENTRIES)
      .plugin('factor-bundle', {
        entries: c.PATH_JS_ENTRIES,
        outputs: c.PATH_JS_ENTRIES.map(function (bundle) {
          return bundle.replace(c.FOLDER_JS, targetFolder);
        })
      })
      .transform(es6ify.configure(/^(?!.*node_modules)+.+\.js$/))
      .on('update', rebundle);

    return rebundle();

    function rebundle () {
      var stream = bundler.bundle();
      return gulpif(minify, stream, stream.on('error', c.notifyError('Browserify')))
        .pipe(source('common.js'))
        .pipe(buffer())
        .pipe(gulpif(minify, uglify()))
        .pipe(gulp.dest(c.target(c.TARGET_FOLDER_JS)))
        .pipe(gulpif(watch, c.notify("Browserify", 'reloaded')));
    }
  };
};

module.exports.deps = ['lint'];
