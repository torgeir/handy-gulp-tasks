var $ = require('zepto-browserify').$;

var lib   = require('./lib/lib'),
    async = require('./lib/async');

async(function * () {
  var $app = $('.app');
  $app.text("Hello.");
  yield lib.delay(2000);
  $app.text("Hello, two seconds later.");
})();
