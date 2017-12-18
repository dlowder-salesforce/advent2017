/*
--- Day 18 ---
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
    recv_mq: []
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
    case 'snd':
      if (part === 1) {
        state.lastPlayed = state.registers[X];
      } else {
        state.send_mq.push(state.registers[X]);
        state.sends++;
      }
      state.pc++;
      break;
    case 'set':
      state.registers[X] = valueOf(state, Y);
      state.pc++;
      break;
    case 'add':
      state.registers[X] += valueOf(state, Y);
      state.pc++;
      break;
    case 'mul':
      state.registers[X] *= valueOf(state, Y);
      state.pc++;
      break;
    case 'mod':
      state.registers[X] = state.registers[X] % valueOf(state, Y);
      state.pc++;
      break;
    case 'rcv':
      if (part === 1) {
        if (state.registers[X]) {
          state.registers[X] = state.lastPlayed;
          state.recovered = true;
        }
        state.pc++;
      } else {
        if (state.recv_mq.length) {
          state.registers[X] = state.recv_mq.shift();
          state.pc++;
          state.blocked = false;
        } else {
          state.blocked = true;
        }
      }
      break;
    case 'jgz':
      if (valueOf(state, X) > 0) {
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
  var state = init_machine(input, 0);
  run_machine(state, input, 1);
  return state.lastPlayed;
};

const solution2 = function(input) {
  var states = [init_machine(input, 0), init_machine(input, 1)];
  states[0].send_mq = states[1].recv_mq;
  states[1].send_mq = states[0].recv_mq;
  var m = 0;
  run_machine(states[m], input, 2);
  while (states[0].recv_mq.length || states[1].recv_mq.length) {
    m = (m + 1) % 2;
    run_machine(states[m], input, 2);
  }
  return states[1].sends;
};

const advent18 = function(callback) {
  io.readInputAsLines('./input18.txt', function(input) {
    let output = 'Day 18: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent18;
