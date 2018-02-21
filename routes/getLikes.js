const models = require('../models');

module.exports = [
  {
    method: 'GET',
    path: '/books/likes',
    handler: (request, response) => {
      models.likes.findAll().then((result) => {
        console.log(result);
        response({
          statusCode: 200,
          result,
        });
      });
    },
  },
];
