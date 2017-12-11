/*
--- Day 11: Hex Ed ---

Crossing the bridge, you've barely reached the other side of the stream 
when a program comes up to you, clearly in distress. "It's my child process," 
she says, "he's gotten lost in an infinite grid!"

Fortunately for her, you have plenty of experience with infinite grids.

Unfortunately for you, it's a hex grid.

The hexagons ("hexes") in this grid are aligned such that adjacent hexes 
can be found to the north, northeast, southeast, south, southwest, and northwest:

  \ n  /
nw +--+ ne
  /    \
-+      +-
  \    /
sw +--+ se
  / s  \
You have the path the child process took. Starting where he started, 
you need to determine the fewest number of steps required to reach him. 
(A "step" means to move from the hex you are in to any adjacent hex.)

For example:

ne,ne,ne is 3 steps away.
ne,ne,sw,sw is 0 steps away (back where you started).
ne,ne,s,s is 2 steps away (se,se).
se,sw,se,sw,sw is 3 steps away (s,s,sw).

--- Part Two ---

How many steps away is the furthest he ever got from his starting position?


 */

const io = require('./utils/io');

const direction_list = function(input) {
  var directions = [
    Math.PI / 6,
    Math.PI / 2,
    Math.PI * 5 / 6,
    Math.PI * 7 / 6,
    Math.PI * 3 / 2,
    Math.PI * 11 / 6
  ];
  var directions = directions.map(function(a) {
    return [Math.cos(a), Math.sin(a)];
  });
  var list = input
    .trim()
    .split(',')
    .map(function(s) {
      switch (s) {
        case 'ne':
          return directions[0];
        case 'n':
          return directions[1];
        case 'nw':
          return directions[2];
        case 'sw':
          return directions[3];
        case 's':
          return directions[4];
        case 'se':
          return directions[5];
      }
    });
  return list;
};

var sqrt3 = Math.sqrt(3);

var hexdistance = function(pos) {
  var x = Math.abs(pos[0]);
  var y = Math.abs(pos[1]);
  var x_steps = 2 * x / sqrt3;
  var y_steps = Math.abs(y - x_steps / 2);
  return Math.round(x_steps + y_steps);
};

const solution = function(directions) {
  var start = [0, 0];
  var dest = [0, 0];
  var current_distance = 0;
  var max_distance = 0;
  for (var i = 0; i < directions.length; i++) {
    dest = [dest[0] + directions[i][0], dest[1] + directions[i][1]];
    current_distance = hexdistance(dest);
    if (current_distance > max_distance) {
      max_distance = current_distance;
    }
  }
  return {
    current: current_distance, // Part 1
    max: max_distance // Part 2
  };
};

const solution2 = function(input) {
  return '';
};

const advent11 = function(callback) {
  io.readInputAsString('./input11.txt', function(input) {
    var directions = direction_list(input);
    var result = solution(directions);
    let output = 'Day 11: ' + result.current + ' ' + result.max;
    callback && callback(output);
  });
};

module.exports = advent11;
