const io = require('./utils/io');

const equals = function(blocks1, blocks2) {
  for (var i = 0; i < blocks1.length; i++) {
    if (blocks1[i] !== blocks2[i]) {
      return false;
    }
  }
  return true;
};

const iterate = function(startblocks) {
  var blocks = [...startblocks];
  var imax = 0;
  var max = -1;
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i] > max) {
      max = blocks[i];
      imax = i;
    }
  }
  blocks[imax] = 0;
  for (var j = 0; j < max; j++) {
    var k = (imax + j + 1) % blocks.length;
    blocks[k] = blocks[k] + 1;
  }
  return blocks;
};

const advent06 = function(callback) {
  io.readInputAsString('./input06.txt', function(input) {
    let initialBlocks = input
      .trim()
      .split('\t')
      .map(function(x) {
        return parseInt(x);
      });

    var steps = [];
    var blocks = initialBlocks;
    steps.push(blocks);
    var loopfound = false;
    var output = 'Day 6:';
    while (!loopfound) {
      blocks = iterate(blocks);
      steps.push(blocks);
      for (var k = 0; k < steps.length - 1; k++) {
        if (equals(steps[k], blocks)) {
          output = output + ' ' + (steps.length - 1); // Part 1
          output = output + ' ' + (steps.length - k - 1); // Part 2
          loopfound = true;
          break;
        }
      }
    }
    callback && callback(output);
  });
};

module.exports = advent06;
