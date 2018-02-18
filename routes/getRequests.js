const helpers = require('../source/helpers');
const models = require('../models');

module.exports = [{
  method: 'GET',
  path: '/books',
  handler: (request, response) => {
    helpers.combineDataFromURLs('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById').then((data) => {
      const groupedData = helpers.groupDataBasedOnKey(data, 'Author');
      const sortedData = {};
      Object.keys(groupedData).forEach((author) => {
        sortedData[author] = groupedData[author].sort((a, b) => a.rating > b.rating);
      });
      response(sortedData);
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
  method: 'PUT',
  path: '/books/{id}/like',
  handler: (request, response) => {
    models.likes.count({
      where:
        {
          bookid: parseInt(request.params.id, 10),
        },
    }).then((count) => {
      if (count === 1) {
        models.likes.update(
          {
            bookid: parseInt(request.params.id, 10),
            liked: true,
          },
          {
            where: {
              bookid: parseInt(request.params.id, 10),
            },
          },
        );
      } else {
        models.likes.create({
          bookid: parseInt(request.params.id, 10),
          liked: true,
        });
      }
      response('Liked');
    });
  },
}, {
  method: 'PUT',
  path: '/books/{id}/dislike',
  handler: (request, response) => {
    models.likes.count({
      where:
        {
          bookid: parseInt(request.params.id, 10),
        },
    }).then((count) => {
      if (count === 1) {
        models.likes.update(
          {
            bookid: parseInt(request.params.id, 10),
            liked: false,
          },
          {
            where: {
              bookid: parseInt(request.params.id, 10),
            },
          },
        );
      } else {
        models.likes.create({
          bookid: parseInt(request.params.id, 10),
          liked: false,
        });
      }
      response('Disliked');
    });
  },
}];
