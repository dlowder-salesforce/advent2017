/*
--- Day 16 ---
 */

const io = require('./utils/io');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const advent16 = function(callback) {
  io.readInputAsString('./input16.txt', function(input) {
    let output = 'Day 16: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent16;
