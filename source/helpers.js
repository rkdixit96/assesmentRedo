const https = require('https');

const groupDataBasedOnKey = (data, key) => {
  const groupedData = {};
  data.forEach((element) => {
    if (groupedData[element[key]] === undefined) {
      groupedData[element[key]] = [];
    }
    groupedData[element[key]].push(element);
  }, this);
  return groupedData;
};

const getDataFromURL = (url) => {
  const urlPromise = new Promise((resolve, reject) => {
    https.get(url, (response) => {
      response.setEncoding('UTF8');
      response.on('data', (data) => {
        // console.log(data);
        resolve(data);
      });
    });
  });
  return urlPromise;
};

const getRatingFromURL = (url) => {
  const ratingPromise = new Promise((resolve, reject) => {
    getDataFromURL(url).then((data) => {
      const jsonRating = JSON.parse(data);
      resolve(jsonRating.rating);
    });
  });
  return ratingPromise;
};

const combineDataFromURLs = (bookURL, ratingURL) => {
  const combinedDataPromise = new Promise((resolve, reject) => {
    getDataFromURL(bookURL).then((data) => {
      const jsonBookData = JSON.parse(data);
      const bookArray = jsonBookData.books;
      const bookArrayCopy = bookArray.slice();
      const promiseArray = [];
      for (let book = 0; book < bookArray.length; book += 1) {
        promiseArray.push(getRatingFromURL(`${ratingURL}/${bookArray[book].id}`));
      }
      Promise.all(promiseArray).then((values) => {
        for (let ratingInd = 0; ratingInd < values.length; ratingInd += 1) {
          bookArrayCopy[ratingInd].rating = values[ratingInd];
        }
        resolve(bookArrayCopy);
      });
    });
  });
  return combinedDataPromise;
};

// getDataFromURL('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks').then((data) => {
//   console.log(data);
// });

// combineDataFromURLs('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById').then((data) => {
//   console.log(data);
// });

module.exports = { getDataFromURL, combineDataFromURLs, groupDataBasedOnKey };

