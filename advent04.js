const io = require('./utils/io');

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

var solution = function(input, test) {
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

io.readInputAsLines('./input04.txt', function(inputStrings) {
  const input = inputStrings.map(function(line) {
    return line.split(' ');
  });
  console.log(solution(input, passwordTest1));
  console.log(solution(input, passwordTest2));
});
