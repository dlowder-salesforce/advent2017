const io = require('./utils/io');

const jumpfunction1 = function(input, loc) {
  var newloc = loc + input[loc];
  input[loc] = input[loc] + 1;
  return newloc;
};

const jumpfunction2 = function(input, loc) {
  var newloc = loc + input[loc];
  if (input[loc] >= 3) {
    input[loc] = input[loc] - 1;
  } else {
    input[loc] = input[loc] + 1;
  }
  return newloc;
};

const solution = function(input, jumpfunction) {
  var loc = 0;
  var steps = 0;
  while (loc < input.length) {
    loc = jumpfunction(input, loc);
    steps++;
  }
  return steps;
};

const advent05 = function() {
  io.readInputAsLines('./input05.txt', function(inputStrings) {
    const input = inputStrings.map(function(line) {
      return parseInt(line.trim());
    });
    console.log('Day 5:');
    let input1 = [...input];
    console.log(solution(input1, jumpfunction1));
    let input2 = [...input];
    console.log(solution(input2, jumpfunction2));
  });
};

module.exports = advent05;
