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
  io.readInputAsLines('./input20.txt', function(input) {
    var re_p = /p=<(.*),(.*),(.*)>/;
    var re_v = /v=<(.*),(.*),(.*)>/;
    var re_a = /a=<(.*),(.*),(.*)>/;
    var p = [];
    var v = [];
    var a = [];
    for (var i = 0; i < input.length; i++) {
      if ((match = re_p.exec(input[i]))) {
        p.push([parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]);
      }
      if ((match = re_v.exec(input[i]))) {
        v.push([parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]);
      }
      if ((match = re_a.exec(input[i]))) {
        a.push([parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]);
      }
    }
    var index_of_min_acceleration = a
      .map(acc => acc[0] * acc[0] + acc[1] * acc[1] + acc[2] * acc[2])
      .reduce((iMax, x, i, arr) => (x < arr[iMax] ? i : iMax), 0);

    let output =
      'Day 20: ' + index_of_min_acceleration + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent20;
