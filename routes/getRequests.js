const helpers = require('../source/helpers');
const models = require('../models');

module.exports = [{
  method: 'GET',
  path: '/books',
  handler: (request, response) => {
    helpers.combineDataFromURLs('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById').then((data) => {
      response(data);
    });
  },
}, {
  method: 'POST',
  path: '/books',
  handler: (request, response) => {
    helpers.combineDataFromURLs('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById').then((data) => {
      // models.bulkCreate(data);
      response('Users created');
    });
  },
}];
