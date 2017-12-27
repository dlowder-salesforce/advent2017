/*
--- Day 22: Sporifica Virus ---

Diagnostics indicate that the local grid computing cluster has been contaminated with the Sporifica Virus. The grid computing cluster is a seemingly-infinite two-dimensional grid of compute nodes. Each node is either clean or infected by the virus.

To prevent overloading the nodes (which would render them useless to the virus) or detection by system administrators, exactly one virus carrier moves through the network, infecting or cleaning nodes as it moves. The virus carrier is always located on a single node in the network (the current node) and keeps track of the direction it is facing.

To avoid detection, the virus carrier works in bursts; in each burst, it wakes up, does some work, and goes back to sleep. The following steps are all executed in order one time each burst:

If the current node is infected, it turns to its right. Otherwise, it turns to its left. (Turning is done in-place; the current node does not change.)
If the current node is clean, it becomes infected. Otherwise, it becomes cleaned. (This is done after the node is considered for the purposes of changing direction.)
The virus carrier moves forward one node in the direction it is facing.
Diagnostics have also provided a map of the node infection status (your puzzle input). Clean nodes are shown as .; infected nodes are shown as #. This map only shows the center of the grid; there are many more nodes beyond those shown, but none of them are currently infected.

The virus carrier begins in the middle of the map facing up.

For example, suppose you are given a map like this:

..#
#..
...
Then, the middle of the infinite grid looks like this, with the virus carrier's position marked with [ ]:

. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . # . . .
. . . #[.]. . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
The virus carrier is on a clean node, so it turns left, infects the node, and moves left:

. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . # . . .
. . .[#]# . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
The virus carrier is on an infected node, so it turns right, cleans the node, and moves up:

. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . .[.]. # . . .
. . . . # . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
Four times in a row, the virus carrier finds a clean, infects it, turns left, and moves forward, ending in the same place and still facing up:

. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . #[#]. # . . .
. . # # # . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
Now on the same node as before, it sees an infection, which causes it to turn right, clean the node, and move forward:

. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . # .[.]# . . .
. . # # # . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
After the above actions, a total of 7 bursts of activity had taken place. Of them, 5 bursts of activity caused an infection.

After a total of 70, the grid looks like this, with the virus carrier facing up:

. . . . . # # . .
. . . . # . . # .
. . . # . . . . #
. . # . #[.]. . #
. . # . # . . # .
. . . . . # # . .
. . . . . . . . .
. . . . . . . . .
By this time, 41 bursts of activity caused an infection (though most of those nodes have since been cleaned).

After a total of 10000 bursts of activity, 5587 bursts will have caused an infection.

Given your actual map, after 10000 bursts of activity, how many bursts cause a node to become infected? (Do not count nodes that begin infected.)

--- Part Two ---

As you go to remove the virus from the infected nodes, it evolves to resist your attempt.

Now, before it infects a clean node, it will weaken it to disable your defenses. If it encounters an infected node, it will instead flag the node to be cleaned in the future. So:

Clean nodes become weakened.
Weakened nodes become infected.
Infected nodes become flagged.
Flagged nodes become clean.
Every node is always in exactly one of the above states.

The virus carrier still functions in a similar way, but now uses the following logic during its bursts of action:

Decide which way to turn based on the current node:
If it is clean, it turns left.
If it is weakened, it does not turn, and will continue moving in the same direction.
If it is infected, it turns right.
If it is flagged, it reverses direction, and will go back the way it came.
Modify the state of the current node, as described above.
The virus carrier moves forward one node in the direction it is facing.
Start with the same map (still using . for clean and # for infected) and still with the virus carrier starting in the middle and facing up.

Using the same initial state as the previous example, and drawing weakened as W and flagged as F, the middle of the infinite grid looks like this, with the virus carrier's position again marked with [ ]:

. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . # . . .
. . . #[.]. . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
This is the same as before, since no initial nodes are weakened or flagged. The virus carrier is on a clean node, so it still turns left, instead weakens the node, and moves left:

. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . # . . .
. . .[#]W . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
The virus carrier is on an infected node, so it still turns right, instead flags the node, and moves up:

. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . .[.]. # . . .
. . . F W . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
This process repeats three more times, ending on the previously-flagged node and facing right:

. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . W W . # . . .
. . W[F]W . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
Finding a flagged node, it reverses direction and cleans the node:

. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . W W . # . . .
. .[W]. W . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
The weakened node becomes infected, and it continues in the same direction:

. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
. . W W . # . . .
.[.]# . W . . . .
. . . . . . . . .
. . . . . . . . .
. . . . . . . . .
Of the first 100 bursts, 26 will result in infection. Unfortunately, another feature of this evolved virus is speed; of the first 10000000 bursts, 2511944 will result in infection.

Given your actual map, after 10000000 bursts of activity, how many bursts cause a node to become infected? (Do not count nodes that begin infected.)

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
