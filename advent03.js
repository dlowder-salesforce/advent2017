var input = 361527;

var solution1 = function(input) {
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

console.log(solution1(input));

// Solution 2: use https://oeis.org/A141481
