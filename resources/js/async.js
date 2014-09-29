module.exports = async;

function async(generator) {
  // if the generator takes args we return a function,
  // that when called passes its args to the generator
  return function() {
    var iterator = generator.apply(this, arguments);
    return move(iterator.next());

    function move(result) {
      if (result.done) {
        return result.value;
      }

      return result.value.then(
        function(promiseResult) {
          return move(iterator.next(promiseResult));
        },
        function(promiseError) {
          return move(iterator.throw(promiseError));
        }
      );
    }
  };
}

// var P = require('bluebird');
// function wait (delay) {
//   return new P(resolve => {
//     setTimeout(resolve, delay * 1000);
//   });
// }

// async(function * () {
//   yield wait(2);
//   console.log('waited 2');
//   yield wait(1);
//   console.log('waited 1');
// });
