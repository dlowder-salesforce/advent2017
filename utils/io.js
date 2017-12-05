/*
 * io.js
 */

const readline = require('readline');
const fs = require('fs');

const readInputAsString = function(inputFile, callback) {
  let contents = fs.readFileSync(inputFile, 'utf8');
  callback && callback(contents);
};

const readInputAsLines = function(inputFile, callback) {
  var input = [];

  const lineReader = readline.createInterface({
    input: fs.createReadStream(inputFile)
  });

  lineReader.on('line', function(line) {
    input.push(line);
  });

  lineReader.on('close', function() {
    callback && callback(input);
  });
};

module.exports = {
  readInputAsString: readInputAsString,
  readInputAsLines: readInputAsLines
};
