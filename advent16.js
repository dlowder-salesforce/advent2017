/*
--- Day 16 ---
 */

const io = require('./utils/io');

const { treeset } = require('js-collections');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const one_round = function(p0, input) {
  var p = p0.slice(0);
  for (var i = 0; i < input.length; i++) {
    switch (input[i % input.length][0]) {
      //Spin, written sX, makes X programs move from the end to the front, but maintain their order otherwise. (For example, s3 on abcde produces cdeab).
      //Exchange, written xA/B, makes the programs at positions A and B swap places.
      //Partner, written pA/B, makes the programs named A and B swap places.
      case 's':
        var r = parseInt(input[i % input.length].slice(1));
        p = p.rotate_n(p.length - r);
        break;
      case 'x':
        var positions = input[i % input.length]
          .slice(1)
          .split('/')
          .map(function(n) {
            return parseInt(n);
          });
        var temp = p[positions[0]];
        p[positions[0]] = p[positions[1]];
        p[positions[1]] = temp;
        break;
      case 'p':
        var elements = input[i % input.length].slice(1).split('/');
        for (var j = 0; j < p.length; j++) {
          if (elements[0] === p[j]) {
            positions[0] = j;
          }
          if (elements[1] === p[j]) {
            positions[1] = j;
          }
        }
        var temp = p[positions[0]];
        p[positions[0]] = p[positions[1]];
        p[positions[1]] = temp;
        break;
      default:
    }
  }
  return p;
};

const advent16 = function(callback) {
  io.readInputAsString('./input16.txt', function(input) {
    input = input.split(',');
    var p0 = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p'
    ];

    var p1 = one_round(p0, input);

    var map = {};

    var p = p0.slice(0);

    var cyclefound = false;
    for (var i = 0; i < 1000000000; i++) {
      p = one_round(p, input);
      if (map[p.join('')] === undefined) {
        map[p.join('')] = i;
      } else {
        if (!cyclefound) {
          cyclefound = true;
          var cycle = i - map[p.join('')];
          i = Math.floor(1000000000 / cycle) * cycle;
        }
      }
    }

    let output = 'Day 16: ' + p1.join('') + ' ' + p.join('');

    callback && callback(output);
  });
};

module.exports = advent16;
