const io = require('./utils/io');

const solution1 = function(input) {
  var sum = 0;
  for (var i = 0; i < input.length; i++) {
    var j = (i + 1) % input.length;
    if (input[i] === input[j]) {
      sum += input[i];
    }
  }
  return sum;
};

const solution2 = function(input) {
  var sum = 0;
  for (var i = 0; i < input.length; i++) {
    var j = (i + input.length / 2) % input.length;
    if (input[i] === input[j]) {
      sum += input[i];
    }
  }
  return sum;
};

const advent01 = function(callback) {
  io.readInputAsString('./input01.txt', function(input) {
    var inputDigits = input
      .trim()
      .split('')
      .map(function(s) {
        return parseInt(s);
      });
    var output =
      'Day 1: ' + solution1(inputDigits) + ' ' + solution2(inputDigits);
    callback && callback(output);
  });
};

module.exports = advent01;
