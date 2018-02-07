

module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define('likes', {
    bookid: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return like;
};
