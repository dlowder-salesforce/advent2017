input = [];

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./input05.txt')
});

lineReader.on('line', function(line) {
  input.push(parseInt(line.trim()));
});

lineReader.on('close', function() {
  runAdvent05();
});

var jumpfunction1 = function(input, loc) {
  var newloc = loc + input[loc];
  input[loc] = input[loc] + 1;
  return newloc;
};

var jumpfunction2 = function(input, loc) {
  var newloc = loc + input[loc];
  if (input[loc] >= 3) {
    input[loc] = input[loc] - 1;
  } else {
    input[loc] = input[loc] + 1;
  }
  return newloc;
};

var solution = function(input, jumpfunction) {
  var loc = 0;
  var steps = 0;
  while (loc < input.length) {
    loc = jumpfunction(input, loc);
    steps++;
  }
  return steps;
};

var runAdvent05 = function() {
  let input1 = [...input];
  console.log(solution(input1, jumpfunction1));
  let input2 = [...input];
  console.log(solution(input2, jumpfunction2));
};
