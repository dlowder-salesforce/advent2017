/*
--- Day 22 ---
 */

const io = require('./utils/io');

const initial_infected_nodes = function(input) {
  var map = {};
  for (var j = 0; j < input.length; j++) {
    for (var i = 0; i < input[j].length; i++) {
      if (input[j][i] === '#') {
        map[[i, j]] = '#';
      }
    }
  }
  return map;
};

const left_turn = function(dir) {
  switch (dir) {
    case 'u':
      return 'l';
    case 'l':
      return 'd';
    case 'd':
      return 'r';
    case 'r':
      return 'u';
  }
};

const right_turn = function(dir) {
  switch (dir) {
    case 'u':
      return 'r';
    case 'l':
      return 'u';
    case 'd':
      return 'l';
    case 'r':
      return 'd';
  }
};

const reverse = function(dir) {
  switch (dir) {
    case 'u':
      return 'd';
    case 'l':
      return 'r';
    case 'd':
      return 'u';
    case 'r':
      return 'l';
  }
};

const next_pos = function(pos, dir) {
  switch (dir) {
    case 'd':
      return [pos[0], pos[1] + 1];
    case 'u':
      return [pos[0], pos[1] - 1];
    case 'l':
      return [pos[0] - 1, pos[1]];
    case 'r':
      return [pos[0] + 1, pos[1]];
  }
};

const burst = function(infected, state) {
  if (infected[state.pos]) {
    delete infected[state.pos];
    state.dir = right_turn(state.dir);
  } else {
    infected[state.pos] = '#';
    state.ninfections = state.ninfections + 1;
    state.dir = left_turn(state.dir);
  }
  state.pos = next_pos(state.pos, state.dir);
};

const burst2 = function(infected, state) {
  switch (infected[state.pos]) {
    case '#':
      infected[state.pos] = 'F';
      state.dir = right_turn(state.dir);
      break;
    case 'F':
      delete infected[state.pos];
      state.dir = reverse(state.dir);
      break;
    case 'W':
      infected[state.pos] = '#';
      state.ninfections = state.ninfections + 1;
      break;
    default:
      infected[state.pos] = 'W';
      state.dir = left_turn(state.dir);
      break;
  }
  state.pos = next_pos(state.pos, state.dir);
};

const solution1 = function(input) {
  var infected = initial_infected_nodes(input);
  var state = {
    pos: [Math.floor(input.length / 2), Math.floor(input.length / 2)],
    dir: 'u',
    ninfections: 0
  };
  for (var i = 0; i < 10000; i++) {
    burst(infected, state);
  }
  return state.ninfections;
};

const solution2 = function(input) {
  var infected = initial_infected_nodes(input);
  var state = {
    pos: [Math.floor(input.length / 2), Math.floor(input.length / 2)],
    dir: 'u',
    ninfections: 0
  };
  for (var i = 0; i < 10000000; i++) {
    burst2(infected, state);
  }
  return state.ninfections;
};

const advent22 = function(callback) {
  io.readInputAsLines('./input22.txt', function(input) {
    let output = 'Day 22: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent22;
