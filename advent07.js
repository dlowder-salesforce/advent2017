const io = require('./utils/io');

// Construct tree as a map
const buildTree = function(input) {
  var nodemap = {};
  var node;
  var key;
  var weight;
  const node_with_children_rex = /^([a-z]+) \((\d+)\) -> (.+)/;
  const node_rex = /^([a-z]+) \((\d+)\)/;
  let match;
  var children;
  for (var i = 0; i < input.length; i++) {
    if ((match = node_rex.exec(input[i]))) {
      key = match[1];
      weight = parseInt(match[2]);
      if ((match = node_with_children_rex.exec(input[i]))) {
        children = match[3].split(', ');
      } else {
        children = [];
      }
    }
    node = nodemap[key] || {};
    node.weight = weight;
    nodemap[key] = node;
    if (children) {
      node.childNodes = children;
      for (var j = 0; j < children.length; j++) {
        node = nodemap[children[j]] || {};
        node.parentNode = key;
        nodemap[children[j]] = node;
      }
    }
  }
  for (var key in nodemap) {
    if (nodemap[key].parentNode === undefined) {
      nodemap['root'] = key;
    }
  }
  return nodemap;
};

// Compute total weight of a subtree
const treeweight = function(nodemap, key) {
  const node = nodemap[key];
  var sum = node.weight;
  if (node.childNodes) {
    for (var i = 0; i < node.childNodes.length; i++) {
      sum += treeweight(nodemap, node.childNodes[i]);
    }
  }
  return sum;
};

// For a given node in the tree, see which child subtree (if any) has
// a tree weight that is different from the other children
const uniqueChild = function(nodemap, key) {
  const children = nodemap[key].childNodes.map(function(c) {
    return {
      key: c,
      weight: treeweight(nodemap, c)
    };
  });
  var weightmap = {};
  for (var i = 0; i < children.length; i++) {
    var count = weightmap['' + children[i].weight] || 0;
    count++;
    weightmap['' + children[i].weight] = count;
  }
  for (i = 0; i < children.length; i++) {
    if (weightmap['' + children[i].weight] === 1) {
      return children[i].key;
    }
  }
  return null;
};

// Root node
const solution1 = function(nodemap) {
  return nodemap['root'];
};

const solution2 = function(nodemap) {
  // Given that there is only one child that causes weights to
  // be out of balance, find it, starting at the root
  var key = nodemap['root'];
  var uniqueChildKey = uniqueChild(nodemap, key);
  while (uniqueChildKey) {
    key = uniqueChildKey;
    uniqueChildKey = uniqueChild(nodemap, key);
  }

  // Go back up one level and build list of the out-of-balance child
  // with its siblings, and their individual weights, and subtree weights
  uniqueChildKey = key;
  key = nodemap[uniqueChildKey].parentNode;
  const children = nodemap[key].childNodes.map(function(c) {
    return {
      key: c,
      weight: nodemap[c].weight,
      totalweight: treeweight(nodemap, c)
    };
  });
  const badchild = children.filter(function(c) {
    return c.key === uniqueChildKey;
  })[0];
  const goodchild = children.filter(function(c) {
    return c.key !== uniqueChildKey;
  })[0];

  // The weight we want is the weight needed to make all subtrees at this level
  // have the same total weight
  const correctweight =
    badchild.weight + goodchild.totalweight - badchild.totalweight;
  return correctweight;
};

const advent07 = function(callback) {
  io.readInputAsLines('./input07.txt', function(input) {
    let nodemap = buildTree(input);
    let output = 'Day 7: ' + solution1(nodemap) + ' ' + solution2(nodemap);
    callback && callback(output);
  });
};

module.exports = advent07;
