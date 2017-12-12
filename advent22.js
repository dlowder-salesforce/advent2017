/*
--- Day 22 ---
 */

const io = require('./utils/io');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const advent22 = function(callback) {
  io.readInputAsString('./input22.txt', function(input) {
    let output = 'Day 22: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent22;
