const helpers = require('../source/helpers');

describe('Testing helpers', () => {
  test('Get data from https url', (done) => {
    helpers.getDataFromURL('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/1').then((data) => {
      const dataJSON = JSON.parse(data);
      expect(dataJSON.rating).toBe(4.45);
    });
    done();
  });
  test('Adds id attribute to books', (done) => {
    helpers.combineDataFromURLs('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById').then((data) => {
      data.forEach((element) => {
        expect(element).toHaveProperty('rating');
      }, this);
      done();
    });
  });
});
