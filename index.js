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
  } catch (e) {}
}
chain(days);
