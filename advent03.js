const input = 361527;

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

const hash = function(loc) {
  return '' + 1000 * loc[0] + loc[1] + 5000;
};

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

const add = function(loc1, loc2) {
  return [loc1[0] + loc2[0], loc1[1] + loc2[1]];
};

// Solution 2: use https://oeis.org/A141481
const solution2 = function(input) {
  const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  var squares = {};
  var loc = [0, 0];
  var distance = 1;
  var direction_counter = 2;
  var direction_index = 0;
  var distance_counter = distance;
  squares[hash(loc)] = 1;
  while (sumOfAdjacentSquares(squares, loc) <= input) {
    loc = add(loc, directions[direction_index]);
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
