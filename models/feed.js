'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Feed.belongsTo(models.user, {
        // Use default alias
        foreignKey: {
          name: 'userId'
        }
      }),
        Feed.hasMany(models.comment, {
          as: 'comments',
          foreignKey: {
            name: 'feedId'
          }
        }),
        Feed.hasMany(models.like, {
          foreignKey: {
            name: 'feedId'
          }
        })
    }
  };
  Feed.init({
    userId: DataTypes.INTEGER,
    fileName: DataTypes.STRING,
    caption: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'feed',
  });
  return Feed;
};