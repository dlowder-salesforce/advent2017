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
  'Day 8: 4902 7037'
];

describe('advent tests', () => {
  test('Run all tests', done => {
    var responses = [];
    let chain = function(fns) {
      if (fns.length > 0) {
        fns[0](function(output) {
          responses.push(output);
          chain(fns.slice(1));
        });
      } else {
        expect(responses.length).toBe(expected_results.length);
        for (var i = 0; i < responses.length; i++) {
          expect(responses[i]).toBe(expected_results[i]);
        }
        done();
      }
    };
    chain(days);
  });
});
