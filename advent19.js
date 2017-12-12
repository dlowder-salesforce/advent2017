/*
--- Day 19 ---
 */

const io = require('./utils/io');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const advent19 = function(callback) {
  io.readInputAsString('./input19.txt', function(input) {
    let output = 'Day 19: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent19;
