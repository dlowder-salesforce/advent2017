var chain = function(fns) {
  if (fns.length > 0) {
    fns[0](function(output) {
      console.log(output);
      chain(fns.slice(1));
    });
  }
};

var days = [];
for (var i = 1; i <= 25; i++) {
  try {
    days.push(require('./advent' + ('0' + i).slice(-2)));
  } catch (e) {
    console.log('Error in require: ' + e);
  }
}

var advent10 = require('./advent10');

if (process.argv && process.argv.length >= 3) {
  if (process.argv[2] === 'all') {
    chain(days);
  } else {
    days[parseInt(process.argv[2]) - 1](output => console.log(output));
  }
} else {
  chain(days);
}
