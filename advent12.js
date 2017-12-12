/*
--- Day 12 ---
 */

const io = require('./utils/io');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const advent12 = function(callback) {
  io.readInputAsString('./input12.txt', function(input) {
    let output = 'Day 12: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent12;
