const io = require('./utils/io');

var findDivisibleNumbersAndDivide = function(a) {
  for (var i = 0; i < a.length - 1; i++) {
    for (var j = i + 1; j < a.length; j++) {
      var n = a[i] > a[j] ? a[i] : a[j];
      var m = a[i] <= a[j] ? a[i] : a[j];
      if (Math.floor(n / m) * m === n) {
        return n / m;
      }
    }
  }
  return -1;
};

var solution1 = function(input) {
  var sum = 0;
  for (var i = 0; i < input.length; i++) {
    var max = input[i].reduce(function(i, j) {
      return i > j ? i : j;
    });
    var min = input[i].reduce(function(i, j) {
      return i < j ? i : j;
    });
    sum += max - min;
  }
  return sum;
};

var solution2 = function(input) {
  var sum = 0;
  for (var i = 0; i < input.length; i++) {
    sum += findDivisibleNumbersAndDivide(input[i]);
  }
  return sum;
};

io.readInputAsLines('./input02.txt', function(input) {
  var inputArrays = input.map(function(line) {
    return line.split('\t').map(function(x) {
      return parseInt(x);
    });
  });
  console.log(solution1(inputArrays));
  console.log(solution2(inputArrays));
});
