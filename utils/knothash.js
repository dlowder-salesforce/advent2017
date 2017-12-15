/*
 * Knot hash code used in days 10 and 14
 */

Object.defineProperty(Array.prototype, 'rotate_n', {
  enumerable: false,
  value: function rotate_n(n) {
    return this.slice(n, this.length).concat(this.slice(0, n));
  }
});

Object.defineProperty(Array.prototype, 'reverse_n', {
  enumerable: false,
  value: function reverse_n(n) {
    return this.slice(0, n)
      .map(function(s, i, a) {
        return a[n - i - 1];
      })
      .concat(this.slice(n, this.length));
  }
});

Object.defineProperty(Array, 'range', {
  enumerable: false,
  value: function range(n) {
    var result = [];
    for (var i = 0; i < n; i++) {
      result.push(i);
    }
    return result;
  }
});

const xorstring = function(list) {
  var a = [];
  for (var i = 0; i < 16; i++) {
    a.push(
      list.slice(16 * i, 16 * (i + 1)).reduce(function(a, b) {
        return a ^ b;
      })
    );
  }
  return a
    .map(function(s) {
      return ('0' + s.toString(16)).slice(-2);
    })
    .join('');
};

const one_round = function(state, lengths) {
  var pos = state.pos;
  var skip_size = state.skip_size;
  var newlist = state.list;
  for (var i = 0; i < lengths.length; i++) {
    newlist = newlist
      .rotate_n(pos)
      .reverse_n(lengths[i])
      .rotate_n(state.list.length - pos);
    pos = (pos + lengths[i] + skip_size) % state.list.length;
    skip_size++;
  }
  return {
    pos: pos,
    skip_size: skip_size,
    list: newlist
  };
};

const knothash1 = function(input) {
  var lengths = input.split(',').map(function(s) {
    return parseInt(s);
  });
  var state = {
    pos: 0,
    skip_size: 0,
    list: Array.range(256)
  };

  state = one_round(state, lengths);

  return state.list[0] * state.list[1];
};

const knothash = function(input) {
  var lengths = input
    .split('')
    .map(function(s) {
      return s.charCodeAt(0);
    })
    .concat([17, 31, 73, 47, 23]);
  var state = { pos: 0, skip_size: 0, list: Array.range(256) };
  for (var i = 0; i < 64; i++) {
    state = one_round(state, lengths);
  }
  return xorstring(state.list);
};

module.exports = {
  knothash1: knothash1,
  knothash: knothash
};
