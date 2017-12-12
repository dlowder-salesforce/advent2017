/*
--- Day 13 ---
 */

const io = require('./utils/io');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const advent13 = function(callback) {
  io.readInputAsString('./input13.txt', function(input) {
    let output = 'Day 13: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent13;
