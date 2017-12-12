/*
--- Day 15 ---
 */

const io = require('./utils/io');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const advent15 = function(callback) {
  io.readInputAsString('./input15.txt', function(input) {
    let output = 'Day 15: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent15;
