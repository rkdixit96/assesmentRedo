const https = require('https');

const getDataFromURL = (url) => {
  const promise = new Promise((resolve, reject) => {
    https.get(url, (response) => {
      response.setEncoding('UTF8');
      response.on('data', (data) => {
        // console.log(data);
        resolve(data);
      });
    });
  });
  return promise;
};

// console.log(getDataFromURL('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/1'));

module.exports = { getDataFromURL };

