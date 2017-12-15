/*
--- Day 14: Disk Defragmentation ---

Suddenly, a scheduled job activates the system's disk defragmenter. Were the 
situation different, you might sit and watch it for a while, but today, you 
just don't have that kind of time. It's soaking up valuable system resources 
that are needed elsewhere, and so the only option is to help it finish its task 
as soon as possible.

The disk in question consists of a 128x128 grid; each square of the grid is 
either free or used. On this disk, the state of the grid is tracked by the 
bits in a sequence of knot hashes.

A total of 128 knot hashes are calculated, each corresponding to a single 
row in the grid; each hash contains 128 bits which correspond to individual 
grid squares. Each bit of a hash indicates whether that square is free (0) 
or used (1).

The hash inputs are a key string (your puzzle input), a dash, and a number 
from 0 to 127 corresponding to the row. For example, if your key string were 
flqrgnkx, then the first row would be given by the bits of the knot hash of 
flqrgnkx-0, the second row from the bits of the knot hash of flqrgnkx-1, and 
so on until the last row, flqrgnkx-127.

The output of a knot hash is traditionally represented by 32 hexadecimal 
digits; each of these digits correspond to 4 bits, for a total of 4 * 32 = 
128 bits. To convert to bits, turn each hexadecimal digit to its equivalent 
binary value, high-bit first: 0 becomes 0000, 1 becomes 0001, e becomes 1110, 
f becomes 1111, and so on; a hash that begins with a0c2017... in hexadecimal 
would begin with 10100000110000100000000101110000... in binary.

Continuing this process, the first 8 rows and columns for key flqrgnkx appear 
as follows, using # to denote used squares, and . to denote free ones:

##.#.#..-->
.#.#.#.#   
....#.#.   
#.#.##.#   
.##.#...   
##..#..#   
.#...#..   
##.#.##.-->
|      |   
V      V   
In this example, 8108 squares are used across the entire 128x128 grid.

Given your actual key string, how many squares are used?
 */

const io = require('./utils/io');

const { knothash1, knothash2 } = require('./utils/knothash');

const { treeset } = require('js-collections');

const bitcounts = {
  '0': 0,
  '1': 1,
  '2': 1,
  '3': 2,
  '4': 1,
  '5': 2,
  '6': 2,
  '7': 3,
  '8': 1,
  '9': 2,
  a: 2,
  b: 3,
  c: 2,
  d: 3,
  e: 3,
  f: 4
};

const bits = {
  '0': [0, 0, 0, 0],
  '1': [0, 0, 0, 1],
  '2': [0, 0, 1, 0],
  '3': [0, 0, 1, 1],
  '4': [0, 1, 0, 0],
  '5': [0, 1, 0, 1],
  '6': [0, 1, 1, 0],
  '7': [0, 1, 1, 1],
  '8': [1, 0, 0, 0],
  '9': [1, 0, 0, 1],
  a: [1, 0, 1, 0],
  b: [1, 0, 1, 1],
  c: [1, 1, 0, 0],
  d: [1, 1, 0, 1],
  e: [1, 1, 1, 0],
  f: [1, 1, 1, 1]
};

const hashbitcount = function(hash) {
  var sum = 0;
  for (var i = 0; i < hash.length; i++) {
    sum += bitcounts[hash[i]];
  }
  return sum;
};

const buildgrid = function(input) {
  var result = [];
  for (var i = 0; i < 128; i++) {
    var row = [];
    var hash = knothash2(input + '-' + i);
    for (var j = 0; j < 32; j++) {
      for (var k in bits[hash[j]]) {
        row.push(bits[hash[j]][k]);
      }
    }
    result.push(row);
  }
  return result;
};

const neighbors = function(point, grid) {
  var n = [];
  n.push([point[0] - 1, point[1]]);
  n.push([point[0] + 1, point[1]]);
  n.push([point[0], point[1] - 1]);
  n.push([point[0], point[1] + 1]);
  n = n.filter(function(p) {
    return (
      p[0] >= 0 && p[0] < 128 && p[1] >= 0 && p[1] < 128 && grid[p[0]][p[1]]
    );
  });
  return n;
};

const buildgroup = function(point, grid, group, allpoints) {
  group.add(point);
  allpoints.remove(point);
  var n = neighbors(point, grid);
  for (var i in n) {
    if (!group.contains(n[i])) {
      buildgroup(n[i], grid, group, allpoints);
    }
  }
};

const findgroups = function(grid) {
  var allpoints = new treeset();
  var groups = [];
  for (var i = 0; i < 128; i++) {
    for (var j = 0; j < 128; j++) {
      if (grid[i][j]) {
        allpoints.add([i, j]);
      }
    }
  }
  while (allpoints.size() > 0) {
    var iterator = allpoints.iterator();
    var point = iterator.next();
    var group = new treeset();
    buildgroup(point, grid, group, allpoints);
    groups.push(group);
  }
  return groups;
};

const solution1 = function(input) {
  var sum = 0;
  for (var i = 0; i < 128; i++) {
    sum += hashbitcount(knothash2(input + '-' + i));
  }
  return sum;
};

const solution2 = function(input) {
  var grid = buildgrid(input);
  var groups = findgroups(grid);
  return groups.length;
};

const advent14 = function(callback) {
  var input = 'ffayrhll';
  let output = 'Day 14: ' + solution1(input) + ' ' + solution2(input);
  callback && callback(output);
};

module.exports = advent14;
