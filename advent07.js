/*
--- Day 7: Recursive Circus ---

Wandering further through the circuits of the computer, you come upon a tower 
of programs that have gotten themselves into a bit of trouble. A recursive 
algorithm has gotten out of hand, and now they're balanced precariously in a 
large tower.

One program at the bottom supports the entire tower. It's holding a large disc, 
and on the disc are balanced several more sub-towers. At the bottom of these 
sub-towers, standing on the bottom disc, are other programs, each holding 
their own disc, and so on. At the very tops of these sub-sub-sub-...-towers, 
many programs stand simply keeping the disc below them balanced but with no 
disc of their own.

You offer to help, but first you need to understand the structure of these 
towers. You ask each program to yell out their name, their weight, and 
(if they're holding a disc) the names of the programs immediately above 
them balancing on that disc. You write this information down (your puzzle 
input). Unfortunately, in their panic, they don't do this in an orderly 
fashion; by the time you're done, you're not sure which program gave which 
information.

For example, if your list is the following:

pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
...then you would be able to recreate the structure of the towers that looks 
like this:

                gyxo
              /     
         ugml - ebii
       /      \     
      |         jptl
      |        
      |         pbga
     /        /
tknk --- padx - havc
     \        \
      |         qoyq
      |             
      |         ktlj
       \      /     
         fwft - cntj
              \     
                xhth
In this example, tknk is at the bottom of the tower (the bottom program), and 
is holding up ugml, padx, and fwft. Those programs are, in turn, holding up 
other programs; in this example, none of those programs are holding up any 
other programs, and are all the tops of their own towers. (The actual tower 
  balancing in front of you is much larger.)

Before you're ready to help them, you need to make sure your information 
is correct. What is the name of the bottom program?

--- Part Two ---

The programs explain the situation: they can't get down. Rather, they could 
get down, if they weren't expending all of their energy trying to keep the 
tower balanced. Apparently, one program has the wrong weight, and until it's 
fixed, they're stuck here.

For any program holding a disc, each program standing on that disc forms a 
sub-tower. Each of those sub-towers are supposed to be the same weight, or 
the disc itself isn't balanced. The weight of a tower is the sum of the 
weights of the programs in that tower.

In the example above, this means that for ugml's disc to be balanced, 
gyxo, ebii, and jptl must all have the same weight, and they do: 61.

However, for tknk to be balanced, each of the programs standing on its 
disc and all programs above it must each match. This means that the 
following sums must all be the same:

ugml + (gyxo + ebii + jptl) = 68 + (61 + 61 + 61) = 251
padx + (pbga + havc + qoyq) = 45 + (66 + 66 + 66) = 243
fwft + (ktlj + cntj + xhth) = 72 + (57 + 57 + 57) = 243
As you can see, tknk's disc is unbalanced: ugml's stack is heavier than the 
other two. Even though the nodes above ugml are balanced, ugml itself is too 
heavy: it needs to be 8 units lighter for its stack to weigh 243 and keep the 
towers balanced. If this change were made, its weight would be 60.

Given that exactly one program is the wrong weight, what would its weight 
need to be to balance the entire tower?

 */
const io = require('./utils/io');

// Compute total weight of a subtree
const treeweight = function(nodemap, key) {
  const node = nodemap[key];
  if (node.treeweight === undefined) {
    var sum = node.weight;
    if (node.childNodes) {
      for (var i = 0; i < node.childNodes.length; i++) {
        sum += treeweight(nodemap, node.childNodes[i]);
      }
    }
    node.treeweight = sum;
  }
  return node.treeweight;
};

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
  treeweight(nodemap, key); // Computes and memoizes all the subtree weights
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
