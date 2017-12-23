/*
--- Day 23 ---
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

const init_machine = function(input, pvalue) {
  var state = {
    machine_id: pvalue,
    pc: 0,
    registers: init_registers(input),
    lastPlayed: -1,
    recovered: false,
    blocked: false,
    sends: 0,
    mul_instructions: 0,
    recv_mq: [],
  };
  if (pvalue) {
    state.registers.p = pvalue;
  }
  return state;
};

const valueOf = function(state, x) {
  return state.registers[x] !== undefined ? state.registers[x] : parseInt(x);
};

const process_instruction = function(state, inst, part) {
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
  }
};

const run_machine = function(state, input, part) {
  state.blocked = false;
  while (
    state.pc >= 0 &&
    state.pc < input.length &&
    state.blocked === false &&
    state.recovered === false
  ) {
    process_instruction(state, input[state.pc], part);
  }
};
const solution1 = function(input) {
  var state = init_machine(input);
  run_machine(state, input);
  return state.mul_instructions;
};

const solution2 = function(input) {
  return '';
};

const advent23 = function(callback) {
  io.readInputAsLines('./input23.txt', function(input) {
    let output = 'Day 23: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent23;
