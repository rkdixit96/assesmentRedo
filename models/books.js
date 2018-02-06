'use strict';
module.exports = (sequelize, DataTypes) => {
  var books = sequelize.define('books', {
    author: DataTypes.STRING,
    bookId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    rating: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return books;
};