/*
--- Day 19: A Series of Tubes ---

Somehow, a network packet got lost and ended up here. It's trying to follow a routing diagram (your puzzle input), but it's confused about where to go.

Its starting point is just off the top of the diagram. Lines (drawn with |, -, and +) show the path it needs to take, starting by going down onto the only line connected to the top of the diagram. It needs to follow this path until it reaches the end (located somewhere within the diagram) and stop there.

Sometimes, the lines cross over each other; in these cases, it needs to continue going the same direction, and only turn left or right when there's no other option. In addition, someone has left letters on the line; these also don't change its direction, but it can use them to keep track of where it's been. For example:

     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 

Given this diagram, the packet needs to take the following path:

Starting at the only line touching the top of the diagram, it must go down, pass through A, and continue onward to the first +.
Travel right, up, and right, passing through B in the process.
Continue down (collecting C), right, and up (collecting D).
Finally, go all the way left through E and stopping at F.
Following the path to the end, the letters it sees on its path are ABCDEF.

The little packet looks up at you, hoping you can help it find the way. What letters will it see (in the order it would see them) if it follows the path? (The routing diagram is very wide; make sure you view it without line wrapping.)

--- Part Two ---

The packet is curious how many steps it needs to go.

For example, using the same routing diagram from the example above...

     |          
     |  +--+    
     A  |  C    
 F---|--|-E---+ 
     |  |  |  D 
     +B-+  +--+ 

...the packet would go:

6 steps down (including the first line at the top of the diagram).
3 steps right.
4 steps up.
3 steps right.
4 steps down.
3 steps right.
2 steps up.
13 steps left (including the F it stops on).
This would result in a total of 38 steps.

How many steps does the packet need to go?


 */

const io = require('./utils/io');

const advent19 = function(callback) {
  io.readInputAsLines('./input19.txt', function(input) {
    var p = [input[0].indexOf('|'), 0];
    var steps = 0;
    var letters = [];
    var dir = 'd';
    var value = '|';
    const re = /[A-Z]/;
    const dirmap = {
      d: [0, 1],
      u: [0, -1],
      l: [-1, 0],
      r: [1, 0]
    };

    while (value !== ' ') {
      steps++;
      p = [p[0] + dirmap[dir][0], p[1] + dirmap[dir][1]];
      value = input[p[1]][p[0]];
      if (value === '+') {
        if (dir === 'd' || dir === 'u') {
          if (!input[p[1]][p[0] - 1] || input[p[1]][p[0] - 1] === ' ') {
            dir = 'r';
          } else {
            dir = 'l';
          }
        } else {
          if (!input[p[1] - 1] || input[p[1] - 1][p[0]] === ' ') {
            dir = 'd';
          } else {
            dir = 'u';
          }
        }
      }
      if (re.exec(value)) {
        letters.push(value);
      }
    }

    let output = 'Day 19: ' + letters.join('') + ' ' + steps;
    callback && callback(output);
  });
};

module.exports = advent19;
