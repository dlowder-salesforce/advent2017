/*
--- Day 18 ---
 */

const io = require('./utils/io');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

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

/*
snd X plays a sound with a frequency equal to the value of X.
set X Y sets register X to the value of Y.
add X Y increases register X by the value of Y.
mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
mod X Y sets register X to the remainder of dividing the value contained in register X by the value of Y (that is, it sets X to the result of X modulo Y).
rcv X recovers the frequency of the last sound played, but only when the value of X is not zero. (If it is zero, the command does nothing.)
jgz X Y jumps with an offset of the value of Y, but only if the value of X is greater than zero. (An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
 */

const process_instruction = function(state, inst) {
  var [opcode, X, Y] = inst.split(' ');
  var yvalue =
    state.registers[Y] !== undefined ? state.registers[Y] : parseInt(Y);

  switch (opcode) {
    case 'snd':
      state.lastPlayed = state.registers[X];
      state.pc++;
      break;
    case 'set':
      state.registers[X] = yvalue;
      state.pc++;
      break;
    case 'add':
      state.registers[X] += yvalue;
      state.pc++;
      break;
    case 'mul':
      state.registers[X] *= yvalue;
      state.pc++;
      break;
    case 'mod':
      state.registers[X] = state.registers[X] % yvalue;
      state.pc++;
      break;
    case 'rcv':
      if (state.registers[X]) {
        state.registers[X] = state.lastPlayed;
        state.recovered = true;
      }
      state.pc++;
      break;
    case 'jgz':
      if (state.registers[X]) {
        state.pc += yvalue;
      } else {
        state.pc++;
      }
  }
};

const advent18 = function(callback) {
  io.readInputAsLines('./input18.txt', function(input) {
    var state = {
      pc: 0,
      registers: init_registers(input),
      lastPlayed: -1,
      recovered: false,
    };
    while (
      state.pc >= 0 &&
      state.pc < input.length &&
      state.recovered === false
    ) {
      process_instruction(state, input[state.pc]);
    }
    let output = 'Day 18: ' + state.lastPlayed + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent18;
