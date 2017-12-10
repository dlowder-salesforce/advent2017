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
];

let check_results = function(i, output, done) {
  console.log(output);
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
});
