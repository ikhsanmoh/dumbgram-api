'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like.belongsTo(models.feed, {
        // as: 'user',
        foreignKey: {
          name: 'feedId'
        }
      })
    }
  };
  Like.init({
    userId: DataTypes.INTEGER,
    feedId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'like',
  });
  return Like;
};