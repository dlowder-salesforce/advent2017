/*
--- Day 14 ---
 */

const io = require('./utils/io');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const advent14 = function(callback) {
  io.readInputAsString('./input14.txt', function(input) {
    let output = 'Day 14: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent14;
