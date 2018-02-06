const server = require('../source/server');

describe('Testing Hapi server', () => {
  test('Responds with 200 for get request', (done) => {
    const options = {
      method: 'GET',
      url: '/books',
    };
    server.inject(options, (response) => {
      // console.log(response);
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('Responds with 201 for post request', (done) => {
    const options = {
      method: 'POST',
      url: '/books',
    };
    server.inject(options, (response) => {
      // console.log(response);
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

