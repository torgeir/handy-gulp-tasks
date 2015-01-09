var P = require('bluebird');

var async = require('./async');

exports.delay = async(function * (ms) {
  yield wait(ms);
});

function wait (ms) {
  return new P(resolve => setTimeout(resolve, ms));
}
