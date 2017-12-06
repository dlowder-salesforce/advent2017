for (var i = 1; i <= 25; i++) {
  var advent = null;
  try {
    advent = require('./advent' + ('0' + i).slice(-2));
  } catch (e) {}
  advent && advent();
}
