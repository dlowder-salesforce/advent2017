var days = [];
for (var i = 1; i <= 25; i++) {
  try {
    days.push(require('../advent' + ('0' + i).slice(-2)));
  } catch (e) {}
}

let expected_results = [
  'Day 1: 1223 1284',
  'Day 2: 53978 314',
  'Day 3: 326 363010',
  'Day 4: 383 265',
  'Day 5: 356945 28372145',
  'Day 6: 7864 1695',
  'Day 7: bsfpjtc 529',
  'Day 8: 4902 7037',
  'Day 9: 17390 7825',
  'Day 10: 46600 23234babdc6afa036749cfa9b597de1b',
  'Day 11: 722 1551',
  'Day 12: 169 179',
  'Day 13: 748 3873662',
  'Day 14: 8190 1134',
  'Day 15: 612 285',
  'Day 16: ebjpfdgmihonackl abocefghijklmndp',
  'Day 17: 419 46038988',
  'Day 18: 8600 7239',
  'Day 19: LIWQYKMRP 16764',
  'Day 20: 150 657',
  'Day 21: 176 2368161',
  'Day 22: 5330 2512103',
  'Day 23: 6241 909',
  'Day 24: 1940 1928',
  'Day 25: 3145 '
];

let run_test = function(i, done) {
  days[i - 1](function(output) {
    expect(output).toBe(expected_results[i - 1]);
    done();
  });
};

describe('advent tests', () => {
  test('Day 1', done => run_test(1, done));
  test('Day 2', done => run_test(2, done));
  test('Day 3', done => run_test(3, done));
  test('Day 4', done => run_test(4, done));
  test('Day 5', done => run_test(5, done));
  test('Day 6', done => run_test(6, done));
  test('Day 7', done => run_test(7, done));
  test('Day 8', done => run_test(8, done));
  test('Day 9', done => run_test(9, done));
  test('Day 10', done => run_test(10, done));
  test('Day 11', done => run_test(11, done));
  test('Day 12', done => run_test(12, done));
  test('Day 13', done => run_test(13, done));
  test('Day 14', done => run_test(14, done));
  test('Day 15', done => run_test(15, done));
  test('Day 16', done => run_test(16, done));
  test('Day 17', done => run_test(17, done));
  test('Day 18', done => run_test(18, done));
  test('Day 19', done => run_test(19, done));
  test('Day 20', done => run_test(20, done));
  test('Day 21', done => run_test(21, done));
  test('Day 22', done => run_test(22, done));
  test('Day 23', done => run_test(23, done));
  test('Day 24', done => run_test(24, done));
  test('Day 25', done => run_test(25, done));
});
