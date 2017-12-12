/*
--- Day 23 ---
 */

const io = require('./utils/io');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const advent23 = function(callback) {
  io.readInputAsString('./input23.txt', function(input) {
    let output = 'Day 23: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent23;
