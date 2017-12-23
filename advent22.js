/*
--- Day 22 ---
 */

const io = require('./utils/io');

const solution1 = function(input) {
  return '';
};

const solution2 = function(input) {
  return '';
};

const initial_infected_nodes = function(input) {
  var map = {};
  for (var j = 0; j < input.length; j++) {
    for (var i = 0; i < input[j].length; i++) {
      if (input[j][i] === '#') {
        map[[i, j]] = 1;
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
    state.pos = next_pos(state.pos, state.dir);
  } else {
    infected[state.pos] = 1;
    state.ninfections = state.ninfections + 1;
    state.dir = left_turn(state.dir);
    state.pos = next_pos(state.pos, state.dir);
  }
};

const advent22 = function(callback) {
  io.readInputAsLines('./input22.txt', function(input) {
    //input = ['..#', '#..', '...'];
    var infected = initial_infected_nodes(input);
    var state = {
      pos: [Math.floor(input.length / 2), Math.floor(input.length / 2)],
      dir: 'u',
      ninfections: 0,
    };
    for (var i = 0; i < 10000; i++) {
      burst(infected, state);
    }

    let output = 'Day 22: ' + state.ninfections + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent22;
