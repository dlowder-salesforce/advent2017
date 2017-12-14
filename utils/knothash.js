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

const knothash1 = function(input) {
  var list = Array.range(256);
  var lengths = input.split(',').map(function(s) {
    return parseInt(s);
  });
  var pos = 0;
  var skip_size = 0;
  var newlist = list;
  for (var i = 0; i < lengths.length; i++) {
    newlist = newlist.rotate_n(pos);
    newlist = newlist.reverse_n(lengths[i]);
    newlist = newlist.rotate_n(list.length - pos);
    pos = (pos + lengths[i] + skip_size) % list.length;
    skip_size++;
  }
  return newlist[0] * newlist[1];
};

const knothash2 = function(input) {
  var list = Array.range(256);
  var lengths = input
    .split('')
    .map(function(s) {
      return s.charCodeAt(0);
    })
    .concat([17, 31, 73, 47, 23]);
  var pos = 0;
  var skip_size = 0;
  var newlist = list;
  for (var j = 0; j < 64; j++) {
    for (var i = 0; i < lengths.length; i++) {
      newlist = newlist.rotate_n(pos);
      newlist = newlist.reverse_n(lengths[i]);
      newlist = newlist.rotate_n(list.length - pos);
      pos = (pos + lengths[i] + skip_size) % list.length;
      skip_size++;
    }
  }
  return xorstring(newlist);
};

module.exports = {
  knothash1: knothash1,
  knothash2: knothash2
};
