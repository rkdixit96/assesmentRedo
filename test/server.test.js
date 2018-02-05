const server = require('../source/server');

describe('Testing Hapi server', () => {
  test('Responds with 200 for get request', () => {
    const options = {
      method: 'GET',
      url: '/books',
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
    });
  });
});

