/*
--- Day 8: I Heard You Like Registers ---

You receive a signal directly from the CPU. Because of your recent assistance 
with jump instructions, it would like you to compute the result of a series of 
unusual register instructions.

Each instruction consists of several parts: the register to modify, whether to 
increase or decrease that register's value, the amount by which to increase or 
decrease it, and a condition. If the condition fails, skip the instruction 
without modifying the register. The registers all start at 0. The instructions 
look like this:

b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
These instructions would be processed as follows:

Because a starts at 0, it is not greater than 1, and so b is not modified.
a is increased by 1 (to 1) because b is less than 5 (it is 0).
c is decreased by -10 (to 10) because a is now greater than or equal to 1 
  (it is 1).
c is increased by -20 (to -10) because c is equal to 10.
After this process, the largest value in any register is 1.

You might also encounter <= (less than or equal to) or != (not equal to). 
However, the CPU doesn't have the bandwidth to tell you what all the registers 
are named, and leaves that to you to determine.

What is the largest value in any register after completing the instructions 
in your puzzle input?

--- Part Two ---

To be safe, the CPU also needs to know the highest value held in any register 
during this process so that it can decide how much memory to allocate to 
these operations. For example, in the above instructions, the highest value 
ever held was 10 (in register c after the third instruction was evaluated).

 */
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
