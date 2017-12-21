/*
--- Day 20: Particle Swarm ---

Suddenly, the GPU contacts you, asking for help. Someone has asked it to simulate too many particles, and it won't be able to finish them all in time to render the next frame at this rate.

It transmits to you a buffer (your puzzle input) listing each particle in order (starting with particle 0, then particle 1, particle 2, and so on). For each particle, it provides the X, Y, and Z coordinates for the particle's position (p), velocity (v), and acceleration (a), each in the format <X,Y,Z>.

Each tick, all particles are updated simultaneously. A particle's properties are updated in the following order:

Increase the X velocity by the X acceleration.
Increase the Y velocity by the Y acceleration.
Increase the Z velocity by the Z acceleration.
Increase the X position by the X velocity.
Increase the Y position by the Y velocity.
Increase the Z position by the Z velocity.
Because of seemingly tenuous rationale involving z-buffering, the GPU would like to know which particle will stay closest to position <0,0,0> in the long term. Measure this using the Manhattan distance, which in this situation is simply the sum of the absolute values of a particle's X, Y, and Z position.

For example, suppose you are only given two particles, both of which stay entirely on the X-axis (for simplicity). Drawing the current states of particles 0 and 1 (in that order) with an adjacent a number line and diagram of current X positions (marked in parenthesis), the following would take place:

p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>    -4 -3 -2 -1  0  1  2  3  4
p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>                         (0)(1)

p=< 4,0,0>, v=< 1,0,0>, a=<-1,0,0>    -4 -3 -2 -1  0  1  2  3  4
p=< 2,0,0>, v=<-2,0,0>, a=<-2,0,0>                      (1)   (0)

p=< 4,0,0>, v=< 0,0,0>, a=<-1,0,0>    -4 -3 -2 -1  0  1  2  3  4
p=<-2,0,0>, v=<-4,0,0>, a=<-2,0,0>          (1)               (0)

p=< 3,0,0>, v=<-1,0,0>, a=<-1,0,0>    -4 -3 -2 -1  0  1  2  3  4
p=<-8,0,0>, v=<-6,0,0>, a=<-2,0,0>                         (0)   
At this point, particle 1 will never be closer to <0,0,0> than particle 0, and so, in the long run, particle 0 will stay closest.

Which particle will stay closest to position <0,0,0> in the long term?

--- Part Two ---

To simplify the problem further, the GPU would like to remove any particles that collide. Particles collide if their positions ever exactly match. Because particles are updated simultaneously, more than two particles can collide at the same time and place. Once particles collide, they are removed and cannot collide with anything else after that tick.

For example:

p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>    
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>    -6 -5 -4 -3 -2 -1  0  1  2  3
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>    (0)   (1)   (2)            (3)
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>

p=<-3,0,0>, v=< 3,0,0>, a=< 0,0,0>    
p=<-2,0,0>, v=< 2,0,0>, a=< 0,0,0>    -6 -5 -4 -3 -2 -1  0  1  2  3
p=<-1,0,0>, v=< 1,0,0>, a=< 0,0,0>             (0)(1)(2)      (3)   
p=< 2,0,0>, v=<-1,0,0>, a=< 0,0,0>

p=< 0,0,0>, v=< 3,0,0>, a=< 0,0,0>    
p=< 0,0,0>, v=< 2,0,0>, a=< 0,0,0>    -6 -5 -4 -3 -2 -1  0  1  2  3
p=< 0,0,0>, v=< 1,0,0>, a=< 0,0,0>                       X (3)      
p=< 1,0,0>, v=<-1,0,0>, a=< 0,0,0>

------destroyed by collision------    
------destroyed by collision------    -6 -5 -4 -3 -2 -1  0  1  2  3
------destroyed by collision------                      (3)         
p=< 0,0,0>, v=<-1,0,0>, a=< 0,0,0>
In this example, particles 0, 1, and 2 are simultaneously destroyed at the time and place marked X. On the next tick, particle 3 passes through unharmed.

How many particles are left after all collisions are resolved?

 */

const io = require('./utils/io');
const { treeset } = require('js-collections');

const init_particles = function(input) {
  var re = /p=<(.*),(.*),(.*)>, v=<(.*),(.*),(.*)>, a=<(.*),(.*),(.*)>/;
  var p = [];
  var v = [];
  var a = [];
  for (var i = 0; i < input.length; i++) {
    if ((match = re.exec(input[i]))) {
      p.push([parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]);
      v.push([parseInt(match[4]), parseInt(match[5]), parseInt(match[6])]);
      a.push([parseInt(match[7]), parseInt(match[8]), parseInt(match[9])]);
    }
  }
  return { p, v, a };
};

const solution1 = function(input) {
  let { p, v, a } = init_particles(input);
  var index_of_min_acceleration = a
    .map(acc => acc[0] * acc[0] + acc[1] * acc[1] + acc[2] * acc[2])
    .reduce((iMax, x, i, arr) => (x < arr[iMax] ? i : iMax), 0);

  return index_of_min_acceleration;
};

const solution2 = function(input) {
  var i, j;
  var { p, v, a } = init_particles(input);
  var set = new treeset();
  for (i = 0; i < input.length; i++) {
    set.add('' + i);
  }

  var t = 0;
  while (t < 1000) {
    t++;
    for (i = 0; i < input.length; i++) {
      v[i][0] += a[i][0];
      v[i][1] += a[i][1];
      v[i][2] += a[i][2];
      p[i][0] += v[i][0];
      p[i][1] += v[i][1];
      p[i][2] += v[i][2];
    }
    for (var i1 = 0; i1 < input.length - 1; i1++) {
      for (var i2 = i1 + 1; i2 < input.length; i2++) {
        if (
          i1 !== i2 &&
          p[i1][0] === p[i2][0] &&
          p[i1][1] === p[i2][1] &&
          p[i1][2] === p[i2][2]
        ) {
          set.remove('' + i1);
          set.remove('' + i2);
        }
      }
    }
  }
  return set.size();
};

const advent20 = function(callback) {
  io.readInputAsLines('./input20.txt', function(input) {
    let output = 'Day 20: ' + solution1(input) + ' ' + solution2(input);
    callback && callback(output);
  });
};

module.exports = advent20;
