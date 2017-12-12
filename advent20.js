/*
--- Day 20 ---
 */

const io = require('./utils/io');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const advent20 = function(callback) {
  io.readInputAsString('./input20.txt', function(input) {
    let output = 'Day 20: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent20;
