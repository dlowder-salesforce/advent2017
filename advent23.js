/*
--- Day 23: Coprocessor Conflagration ---

You decide to head directly to the CPU and fix the printer from there. As you get close, you find an experimental coprocessor doing so much work that the local programs are afraid it will halt and catch fire. This would cause serious issues for the rest of the computer, so you head in and see what you can do.

The code it's running seems to be a variant of the kind you saw recently on that tablet. The general functionality seems very similar, but some of the instructions are different:

set X Y sets register X to the value of Y.
sub X Y decreases register X by the value of Y.
mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
jnz X Y jumps with an offset of the value of Y, but only if the value of X is not zero. (An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
Only the instructions listed above are used. The eight registers here, named a through h, all start at 0.

The coprocessor is currently set to some kind of debug mode, which allows for testing, but prevents it from doing any meaningful work.

If you run the program (your puzzle input), how many times is the mul instruction invoked?

--- Part Two ---

Now, it's time to fix the problem.

The debug mode switch is wired directly to register a. You flip the switch, which makes register a now start at 1 when the program is executed.

Immediately, the coprocessor begins to overheat. Whoever wrote this program obviously didn't choose a very efficient implementation. You'll need to optimize the program if it has any hope of completing before Santa needs that printer working.

The coprocessor's ultimate goal is to determine the final value left in register h once the program completes. Technically, if it had that... it wouldn't even need to run the program.

After setting register a to 1, if the program were to run to completion, what value would be left in register h?

`
 */

const io = require('./utils/io');

const init_registers = function(input) {
  var registers = {};
  for (var i in input) {
    var r = input[i].split(' ')[1];
    if (r !== undefined && isNaN(parseInt(r))) {
      registers[r] = 0;
    }
  }
  return registers;
};

const init_machine = function(input) {
  var state = {
    pc: 0,
    registers: init_registers(input),
    mul_instructions: 0
  };
  return state;
};

const valueOf = function(state, x) {
  return state.registers[x] !== undefined ? state.registers[x] : parseInt(x);
};

const process_instruction = function(state, inst) {
  var [opcode, X, Y] = inst.split(' ');

  switch (opcode) {
    case 'set':
      state.registers[X] = valueOf(state, Y);
      state.pc++;
      break;
    case 'sub':
      state.registers[X] -= valueOf(state, Y);
      state.pc++;
      break;
    case 'mul':
      state.registers[X] *= valueOf(state, Y);
      state.mul_instructions += 1;
      state.pc++;
      break;
    case 'jnz':
      if (valueOf(state, X) !== 0) {
        state.pc += valueOf(state, Y);
      } else {
        state.pc++;
      }
      break;
    default:
      state.pc++;
  }
};

const run_machine = function(state, input) {
  while (state.pc >= 0 && state.pc < input.length) {
    process_instruction(state, input[state.pc]);
  }
};

const solution1 = function(input) {
  var state = init_machine(input);
  run_machine(state, input);
  return state.mul_instructions;
};

const solution2 = function(input) {
  input[3] = 'jnz 0 5';
  var state = init_machine(input);
  state.registers.a = 1;
  while (state.pc < 6) {
    process_instruction(state, input[state.pc]);
  }
  var h = 0;
  for (var x = state.registers.b; x < state.registers.b + 17001; x += 17) {
    for (var i = 2; i < x; i++) {
      if (x % i === 0) {
        h++;
        break;
      }
    }
  }
  return h;
};

const advent23 = function(callback) {
  io.readInputAsLines('./input23.txt', function(input) {
    let output = 'Day 23: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent23;
