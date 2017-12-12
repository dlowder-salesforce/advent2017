/*
--- Day 24 ---
 */

const io = require('./utils/io');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const advent24 = function(callback) {
  io.readInputAsString('./input24.txt', function(input) {
    let output = 'Day 24: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent24;
