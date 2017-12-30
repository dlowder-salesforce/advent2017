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

let check_results = function(i, output, done) {
  //console.log(output);
  expect(output).toBe(expected_results[i]);
  done();
};

describe('advent tests', () => {
  test('Day 1', done => {
    days[0](output => check_results(0, output, done));
  });
  test('Day 2', done => {
    days[1](output => check_results(1, output, done));
  });
  test('Day 3', done => {
    days[2](output => check_results(2, output, done));
  });
  test('Day 4', done => {
    days[3](output => check_results(3, output, done));
  });
  test('Day 5', done => {
    days[4](output => check_results(4, output, done));
  });
  test('Day 6', done => {
    days[5](output => check_results(5, output, done));
  });
  test('Day 7', done => {
    days[6](output => check_results(6, output, done));
  });
  test('Day 8', done => {
    days[7](output => check_results(7, output, done));
  });
  test('Day 9', done => {
    days[8](output => check_results(8, output, done));
  });
  test('Day 10', done => {
    days[9](output => check_results(9, output, done));
  });
  test('Day 11', done => {
    days[10](output => check_results(10, output, done));
  });
  test('Day 12', done => {
    days[11](output => check_results(11, output, done));
  });
  test('Day 13', done => {
    days[12](output => check_results(12, output, done));
  });
  test('Day 14', done => {
    days[13](output => check_results(13, output, done));
  });
  test('Day 15', done => {
    days[14](output => check_results(14, output, done));
  });
  test('Day 16', done => {
    days[15](output => check_results(15, output, done));
  });
  test('Day 17', done => {
    days[16](output => check_results(16, output, done));
  });
  test('Day 18', done => {
    days[17](output => check_results(17, output, done));
  });
  test('Day 19', done => {
    days[18](output => check_results(18, output, done));
  });
  test('Day 20', done => {
    days[19](output => check_results(19, output, done));
  });
  test('Day 21', done => {
    days[20](output => check_results(20, output, done));
  });
  test('Day 22', done => {
    days[21](output => check_results(21, output, done));
  });
  test('Day 23', done => {
    days[22](output => check_results(22, output, done));
  });
  test('Day 24', done => {
    days[23](output => check_results(23, output, done));
  });
  test('Day 25', done => {
    days[24](output => check_results(24, output, done));
  });
});
