/*
--- Day 18 ---
 */

const io = require('./utils/io');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const advent18 = function(callback) {
  io.readInputAsString('./input18.txt', function(input) {
    let output = 'Day 18: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent18;
