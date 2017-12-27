/*
 --- Day 21: Fractal Art ---

You find a program trying to generate some art. It uses a strange process that involves repeatedly enhancing the detail of an image through a set of rules.

The image consists of a two-dimensional square grid of pixels that are either on (#) or off (.). The program always begins with this pattern:

.#.
..#
###
Because the pattern is both 3 pixels wide and 3 pixels tall, it is said to have a size of 3.

Then, the program repeats the following process:

If the size is evenly divisible by 2, break the pixels up into 2x2 squares, and convert each 2x2 square into a 3x3 square by following the corresponding enhancement rule.
Otherwise, the size is evenly divisible by 3; break the pixels up into 3x3 squares, and convert each 3x3 square into a 4x4 square by following the corresponding enhancement rule.
Because each square of pixels is replaced by a larger one, the image gains pixels and so its size increases.

The artist's book of enhancement rules is nearby (your puzzle input); however, it seems to be missing rules. The artist explains that sometimes, one must rotate or flip the input pattern to find a match. (Never rotate or flip the output pattern, though.) Each pattern is written concisely: rows are listed as single units, ordered top-down, and separated by slashes. For example, the following rules correspond to the adjacent patterns:

../.#  =  ..
          .#

                .#.
.#./..#/###  =  ..#
                ###

                        #..#
#..#/..../#..#/.##.  =  ....
                        #..#
                        .##.
When searching for a rule to use, rotate and flip the pattern as necessary. For example, all of the following patterns match the same rule:

.#.   .#.   #..   ###
..#   #..   #.#   ..#
###   ###   ##.   .#.
Suppose the book contained the following two rules:

../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
As before, the program begins with this pattern:

.#.
..#
###
The size of the grid (3) is not divisible by 2, but it is divisible by 3. It divides evenly into a single square; the square matches the second rule, which produces:

#..#
....
....
#..#
The size of this enhanced grid (4) is evenly divisible by 2, so that rule is used. It divides evenly into four squares:

#.|.#
..|..
--+--
..|..
#.|.#
Each of these squares matches the same rule (../.# => ##./#../...), three of which require some flipping and rotation to line up with the rule. The output for the rule is the same in all four cases:

##.|##.
#..|#..
...|...
---+---
##.|##.
#..|#..
...|...
Finally, the squares are joined into a new grid:

##.##.
#..#..
......
##.##.
#..#..
......
Thus, after 2 iterations, the grid contains 12 pixels that are on.

How many pixels stay on after 5 iterations?

--- Part Two ---

How many pixels stay on after 18 iterations?

 */

const io = require('./utils/io');

const string_to_array = function(s) {
  return s.split('/').map(l => l.split(''));
};

const array_to_string = function(a) {
  return a.map(l => l.join('')).join('/');
};

const rotate = function(s) {
  let a = string_to_array(s);
  var b = a.slice(0);
  for (var i = 0; i < a.length; i++) {
    b[i] = a[i].slice(0);
    for (var j = 0; j < a.length; j++) {
      b[i][j] = a[a.length - j - 1][i];
    }
  }
  return array_to_string(b);
};

const flip = function(s) {
  let a = string_to_array(s);
  var b = a.slice(0);
  for (var i = 0; i < a.length; i++) {
    b[i] = a[i].slice(0);
    for (var j = 0; j < a.length; j++) {
      b[i][j] = a[a.length - 1 - i][j];
    }
  }
  return array_to_string(b);
};

const create_rulebook = function(input) {
  var rulebook = {};
  for (var i in input) {
    var a = input[i].split(' => ');
    rulebook[a[0]] = a[1];
  }
  var additions = {};
  for (var key in rulebook) {
    var key2 = key.slice(0);
    for (i = 0; i < 3; i++) {
      key2 = rotate(key2);
      if (!rulebook[key2]) {
        additions[key2] = rulebook[key];
      }
    }
    key2 = flip(key);
    if (!rulebook[key2]) {
      additions[key2] = rulebook[key];
    }
    for (i = 0; i < 3; i++) {
      key2 = rotate(key2);
      if (!rulebook[key2]) {
        additions[key2] = rulebook[key];
      }
    }
  }
  for (key in additions) {
    rulebook[key] = additions[key];
  }
  return rulebook;
};

const new_array = function(size) {
  var a = [];
  for (var i = 0; i < size; i++) {
    var b = [];
    for (var j = 0; j < size; j++) {
      b.push('.');
    }
    a.push(b);
  }
  return a;
};

const subarray = function(array, i, j, size) {
  var a = new_array(size);
  for (var i1 = 0; i1 < size; i1++) {
    for (var j1 = 0; j1 < size; j1++) {
      a[j1][i1] = array[j + j1][i + i1];
    }
  }
  return a;
};

const copy_subarray = function(array, subarray, i, j) {
  for (var i1 = 0; i1 < subarray.length; i1++) {
    for (var j1 = 0; j1 < subarray.length; j1++) {
      array[j + j1][i + i1] = subarray[j1][i1];
    }
  }
};

const iterate = function(state, rulebook) {
  var ni = 3;
  var no = 4;
  if (state.length % 2 === 0) {
    ni = 2;
    no = 3;
  }
  var a = new_array(state.length * no / ni);
  for (var i = 0; i < state.length; i += ni) {
    for (var j = 0; j < state.length; j += ni) {
      var si = array_to_string(subarray(state, i, j, ni));
      var so = string_to_array(rulebook[si]);
      copy_subarray(a, so, i * no / ni, j * no / ni);
    }
  }
  return a;
};

const count_pixels = function(state) {
  return state
    .map(s => s.reduce((a, b) => a + (b === '#' ? 1 : 0), 0))
    .reduce((a, b) => a + b);
};

const pixels_after_iterations = function(input, count) {
  var rulebook = create_rulebook(input);
  let start = string_to_array('.#./..#/###');
  var next_state = start;
  for (var i = 0; i < count; i++) {
    next_state = iterate(next_state, rulebook);
  }
  return count_pixels(next_state);
};

const solution1 = function(input) {
  return pixels_after_iterations(input, 5);
};

const solution2 = function(input) {
  return pixels_after_iterations(input, 18);
};

const advent21 = function(callback) {
  io.readInputAsLines('./input21.txt', function(input) {
    let output = 'Day 21: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent21;
