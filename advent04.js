input = [];

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./input04.txt')
});

lineReader.on('line', function(line) {
  input.push(line.split(' '));
});

lineReader.on('close', function() {
  runAdvent04();
});

var passwordTest1 = function(word1, word2) {
  return word1 === word2;
};

var passwordTest2 = function(word1, word2) {
  return (
    word1
      .split('')
      .sort()
      .join('') ===
    word2
      .split('')
      .sort()
      .join('')
  );
};

var solution = function(test) {
  var sum = 0;
  for (var i = 0; i < input.length; i++) {
    var password = input[i];
    var valid = true;
    for (var j = 0; j < password.length - 1; j++) {
      for (var k = j + 1; k < password.length; k++) {
        if (test(password[j], password[k])) {
          valid = false;
          break;
        }
      }
    }
    if (valid) {
      sum++;
    }
  }
  return sum;
};

var runAdvent04 = function() {
  console.log(solution(passwordTest1));
  console.log(solution(passwordTest2));
};
