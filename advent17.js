/*
--- Day 17 ---
 */

const io = require('./utils/io');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const advent17 = function(callback) {
  io.readInputAsString('./input17.txt', function(input) {
    let output = 'Day 17: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent17;
