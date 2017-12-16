/*
 * Useful additions to the Array API
 *
 * These methods all return a new array and leave the old one unchanged
 */

// Move the first n elements to the tail of the array
Object.defineProperty(Array.prototype, 'rotate_n', {
  enumerable: false,
  value: function rotate_n(n) {
    return this.slice(n, this.length).concat(this.slice(0, n));
  }
});

// Reverse the order of the first n elements in the array
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

// static Array method that returns the array [0, 1, ... , n-1]
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
