var $ = require('zepto-browserify').$;

var lib   = require('./lib'),
    async = require('./async');

async(function * () {
  var $app = $('.app');
  $app.text("Hello.");
  yield lib.delay(2000);
  $app.text("Hello, two seconds later.");
})();
