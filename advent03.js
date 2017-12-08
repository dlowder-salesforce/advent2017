/*
--- Day 3: Spiral Memory ---

You come across an experimental new kind of memory stored on an infinite 
two-dimensional grid.

Each square on the grid is allocated in a spiral pattern starting at a 
location marked 1 and then counting up while spiraling outward. For example, 
the first few squares are allocated like this:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...
While this is very space-efficient (no squares are skipped), requested data 
must be carried back to square 1 (the location of the only access port for this 
  memory system) by programs that can only move up, down, left, or right. They 
  always take the shortest path: the Manhattan Distance between the location of
  the data and square 1.

For example:

Data from square 1 is carried 0 steps, since it's at the access port.
Data from square 12 is carried 3 steps, such as: down, left, left.
Data from square 23 is carried only 2 steps: up twice.
Data from square 1024 must be carried 31 steps.
How many steps are required to carry the data from the square identified 
in your puzzle input all the way to the access port?

--- Part Two ---

As a stress test on the system, the programs here clear the grid and then 
store the value 1 in square 1. Then, in the same allocation order as shown 
above, they store the sum of the values in all adjacent squares, including 
diagonals.

So, the first few squares' values are chosen as follows:

Square 1 starts with the value 1.
Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
Square 3 has both of the above squares as neighbors and stores the sum of 
  their values, 2.
Square 4 has all three of the aforementioned squares as neighbors and stores 
  the sum of their values, 4.
Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
Once a square is written, its value does not change. Therefore, the first few 
  squares would receive the following values:

147  142  133  122   59
304    5    4    2   57
330   10    1    1   54
351   11   23   25   26
362  747  806--->   ...
What is the first value written that is larger than your puzzle input?

 */

const input = 361527;

// Given the input integer, return its distance from the center of the spiral
const solution1 = function(input) {
  for (var i = 1; i < input; i += 2) {
    var corner = i * i;
    if (corner >= input) {
      if (corner === input) {
        return 2 * Math.floor(i / 2);
      }
      while (corner >= input) {
        corner -= i - 1;
      }
      return Math.floor(i / 2) + Math.abs(corner + Math.floor(i / 2) - input);
    }
  }
};

// Given xy location of a square, create hash for use as a key in the map
// of filled in squares
const hash = function(loc) {
  return '' + 1000 * loc[0] + loc[1] + 5000;
};

// Sums the values of all the squares around a given location
const sumOfAdjacentSquares = function(squares, loc) {
  let locs = [
    [loc[0] - 1, loc[1] - 1],
    [loc[0], loc[1] - 1],
    [loc[0] + 1, loc[1] - 1],
    [loc[0] - 1, loc[1]],
    [loc[0] + 1, loc[1]],
    [loc[0] - 1, loc[1] + 1],
    [loc[0], loc[1] + 1],
    [loc[0] + 1, loc[1] + 1]
  ];
  var sum = 0;
  for (var k = 0; k < locs.length; k++) {
    sum += squares[hash(locs[k])] || 0;
  }
  return sum;
};

// Returns the new location given an initial location and a direction
const move = function(loc, direction) {
  return [loc[0] + direction[0], loc[1] + direction[1]];
};

// Solution 2: see also https://oeis.org/A141481
const solution2 = function(input) {
  const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  var squares = {};
  var loc = [0, 0];
  var distance = 1;
  var direction_counter = 2;
  var direction_index = 0;
  var distance_counter = distance;
  squares[hash(loc)] = 1;
  // Start at center, move 1 square, turn left, move 1 square, turn left,
  //                  move 2 squares, turn left, move 2 squares, turn left,
  //                  move 3 squares, turn left, move 3 squares, turn left,
  // ....
  // Keep computing adjacent square sums until it exceeds input, then return
  // the last sum computed
  while (sumOfAdjacentSquares(squares, loc) <= input) {
    loc = move(loc, directions[direction_index]);
    squares[hash(loc)] = sumOfAdjacentSquares(squares, loc);
    distance_counter--;
    if (distance_counter === 0) {
      direction_index = (direction_index + 1) % 4;
      direction_counter--;
      if (direction_counter === 0) {
        direction_counter = 2;
        distance++;
      }
      distance_counter = distance;
    }
  }
  return sumOfAdjacentSquares(squares, loc);
};

const advent03 = function(callback) {
  var output = 'Day 3: ' + solution1(input) + ' ' + solution2(input);
  callback && callback(output);
};

module.exports = advent03;
