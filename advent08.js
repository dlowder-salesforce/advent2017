const io = require('./utils/io');

const create_register_map = function(input) {
  var register_map = {};
  for (var i in input) {
    var tokens = input[i].split(' ');
    register_map[tokens[0]] = 0;
    register_map[tokens[4]] = 0;
  }
  return register_map;
};

const process_instruction = function(rmap, s) {
  let tokens = s.split(' ');
  let r = tokens[0];
  let inc = tokens[1] === 'inc'; // true = inc, false = dec
  let amt = parseInt(tokens[2]);
  let tr = tokens[4];
  let op = tokens[5];
  let tamt = parseInt(tokens[6]);
  var test;
  switch (op) {
    case '<':
      test = rmap[tr] < tamt;
      break;
    case '>':
      test = rmap[tr] > tamt;
      break;
    case '<=':
      test = rmap[tr] <= tamt;
      break;
    case '>=':
      test = rmap[tr] >= tamt;
      break;
    case '==':
      test = rmap[tr] === tamt;
      break;
    case '!=':
      test = rmap[tr] !== tamt;
      break;
  }
  if (test) {
    rmap[r] = inc ? rmap[r] + amt : rmap[r] - amt;
  }
};

const largest_amount = function(rmap) {
  var max = -Number.MAX_SAFE_INTEGER;
  for (var key in rmap) {
    if (rmap[key] > max) {
      max = rmap[key];
    }
  }
  return max;
};

const solution1 = function(input) {
  var register_map = create_register_map(input);
  for (var i in input) {
    process_instruction(register_map, input[i]);
  }
  return '' + largest_amount(register_map);
};

const solution2 = function(input) {
  var register_map = create_register_map(input);
  var max = -Number.MAX_SAFE_INTEGER;
  for (var i in input) {
    process_instruction(register_map, input[i]);
    var amt = largest_amount(register_map);
    if (amt > max) {
      max = amt;
    }
  }
  return '' + max;
};

const advent08 = function(callback) {
  io.readInputAsLines('./input08.txt', function(input) {
    let output = 'Day 8: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent08;
