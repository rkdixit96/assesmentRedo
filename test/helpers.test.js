const helpers = require('../source/helpers');

describe('Testing helpers', () => {
  test('Get data from https url', (done) => {
    helpers.getDataFromURL('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/1').then((data) => {
      const dataJSON = JSON.parse(data);
      expect(dataJSON.rating).toBe(4.45);
    });
    done();
  });
});
