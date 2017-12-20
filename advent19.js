/*
--- Day 19 ---
 */

const io = require('./utils/io');

const advent19 = function(callback) {
  io.readInputAsLines('./input19.txt', function(input) {
    var p = [input[0].indexOf('|'), 0];
    var steps = 0;
    var letters = [];
    var dir = 'd';
    var value = '|';
    const re = /[A-Z]/;
    const dirmap = {
      d: [0, 1],
      u: [0, -1],
      l: [-1, 0],
      r: [1, 0]
    };

    while (value !== ' ') {
      steps++;
      p = [p[0] + dirmap[dir][0], p[1] + dirmap[dir][1]];
      value = input[p[1]][p[0]];
      if (value === '+') {
        if (dir === 'd' || dir === 'u') {
          if (!input[p[1]][p[0] - 1] || input[p[1]][p[0] - 1] === ' ') {
            dir = 'r';
          } else {
            dir = 'l';
          }
        } else {
          if (!input[p[1] - 1] || input[p[1] - 1][p[0]] === ' ') {
            dir = 'd';
          } else {
            dir = 'u';
          }
        }
      }
      if (re.exec(value)) {
        letters.push(value);
      }
    }

    let output = 'Day 19: ' + letters.join('') + ' ' + steps;
    callback && callback(output);
  });
};

module.exports = advent19;
