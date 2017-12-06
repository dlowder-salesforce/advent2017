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

const advent01 = function() {
  io.readInputAsString('./input01.txt', function(input) {
    var inputDigits = input
      .trim()
      .split('')
      .map(function(s) {
        return parseInt(s);
      });
    console.log('Day 1:');
    console.log(solution1(inputDigits));
    console.log(solution2(inputDigits));
  });
};

module.exports = advent01;
