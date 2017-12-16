/*
--- Day 16: Permutation Promenade ---

You come upon a very unusual sight; a group of programs here appear to be 
dancing.

There are sixteen programs in total, named a through p. They start by standing 
in a line: a stands in position 0, b stands in position 1, and so on until p, 
which stands in position 15.

The programs' dance consists of a sequence of dance moves:

Spin, written sX, makes X programs move from the end to the front, but 
maintain their order otherwise. (For example, s3 on abcde produces cdeab).
Exchange, written xA/B, makes the programs at positions A and B swap places.
Partner, written pA/B, makes the programs named A and B swap places.
For example, with only five programs standing in a line (abcde), they could 
do the following dance:

s1, a spin of size 1: eabcd.
x3/4, swapping the last two programs: eabdc.
pe/b, swapping programs e and b: baedc.
After finishing their dance, the programs end up in order baedc.

You watch the dance for a while and record their dance moves (your puzzle 
input). In what order are the programs standing after their dance?

--- Part Two ---

Now that you're starting to get a feel for the dance moves, you turn your 
attention to the dance as a whole.

Keeping the positions they ended up in from their previous dance, the 
programs perform it again and again: including the first dance, a total 
of one billion (1000000000) times.

In the example above, their second dance would begin with the order baedc, 
and use the same dance moves:

s1, a spin of size 1: cbaed.
x3/4, swapping the last two programs: cbade.
pe/b, swapping programs e and b: ceadb.

In what order are the programs standing after their billion dances?
 */

require('./utils/arrayprototypes');

const io = require('./utils/io');

const { treeset } = require('js-collections');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const swap = function(p, positions) {
  var temp = p[positions[0]];
  p[positions[0]] = p[positions[1]];
  p[positions[1]] = temp;
};

const one_round = function(p0, input) {
  var p = p0.slice(0);
  for (var i = 0; i < input.length; i++) {
    switch (input[i % input.length][0]) {
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
        swap(p, positions);
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
        swap(p, positions);
        break;
      default:
    }
  }
  return p;
};

const advent16 = function(callback) {
  io.readInputAsString('./input16.txt', function(input) {
    input = input.split(',');
    let p0 = Array.range(16).map(n => {
      return String.fromCharCode('a'.charCodeAt(0) + n);
    });

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
