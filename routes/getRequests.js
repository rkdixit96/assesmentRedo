const helpers = require('../source/helpers');
const models = require('../models');

module.exports = [{
  method: 'GET',
  path: '/books',
  handler: (request, response) => {
    helpers.combineDataFromURLs('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById').then((data) => {
      models.books.findAll({ group: 'author' }).then((result) => {
        response(result);
      });
      response(data);
    });
  },
}, {
  method: 'POST',
  path: '/books',
  handler: (request, response) => {
    const promiseArray = [];
    helpers.combineDataFromURLs('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById').then((data) => {
      models.books.destroy({ where: {}, truncate: true });
      data.forEach((element) => {
        const promise = new Promise((resolve, reject) => {
          models.books.create({
            author: element.Author,
            bookId: element.id,
            name: element.Name,
            rating: element.rating,
          });
          resolve('Added');
        });
        promiseArray.push(promise);
      }, this);
    });
    Promise.all(promiseArray).then(() => {
      response('Uploaded');
    });
  },
}, {
  method: 'POST',
  path: '/books/{id}/like',
  handler: (request, response) => {
    models.likes.count({ where: { bookid: parseInt(request.params.id, 10) } }).then((count) => {
      if (count !== 1) {
        models.likes.create({
          bookid: parseInt(request.params.id, 10),
          liked: true,
        }).then(() => {
          response('Liked');
        });
      } else {
        response('Already done');
      }
    });
  },
}];
