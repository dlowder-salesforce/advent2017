input = [];

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./input01.txt')
});
    
lineReader.on('line', function (line) {
  input = line.split('');
});
    
lineReader.on('close', function () {
  runAdvent01();
});


var solution1 = function() {
  var sum = 0;
  for (var i=0; i<input.length; i++) {
    var j = (i + 1)%(input.length);
    if (input[i] == input[j]) {
      sum += parseInt(input[i]);
    }
  }
  return sum;
}

var solution2 = function() {
  var sum = 0;
  for (var i=0; i<input.length; i++) {
    var j = (i + (input.length/2))%(input.length);
    if (input[i] == input[j]) {
      sum += parseInt(input[i]);
    }
  }
  return sum;
}

var runAdvent01 = function() {


  console.log(solution1());
  console.log(solution2());
}
