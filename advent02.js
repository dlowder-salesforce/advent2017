input = [];

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./input02.txt')
});
    
lineReader.on('line', function (line) {
  input.push(line.split('\t').map(function(x) {return parseInt(x);}));
});
    
lineReader.on('close', function () {
  runAdvent02();
});

var findDivisibleNumbersAndDivide = function(a) {
  for (var i=0; i<a.length-1; i++) {
    for (var j=i+1; j<a.length; j++) {
      var n = a[i] > a[j] ? a[i] : a[j];
      var m = a[i] <= a[j] ? a[i] : a[j];
      if (Math.floor(n/m)*m === n) {
        return n/m;
      }
    }
  }
  return -1;
};

var solution1 = function() {
  var sum = 0;
  for (var i=0; i<input.length; i++) {
    var max = input[i].reduce(function(i, j) { return i > j ? i : j; });
    var min = input[i].reduce(function(i, j) { return i < j ? i : j; });
    sum += max - min;
  }
  return sum;
}

var solution2 = function() {
  var sum = 0;
  for (var i=0; i<input.length; i++) {
    sum += findDivisibleNumbersAndDivide(input[i]);
  }
  return sum;
}

var runAdvent02 = function() {
  console.log(solution1());
  console.log(solution2());
}
