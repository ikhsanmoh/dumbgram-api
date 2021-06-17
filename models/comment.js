'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.feed, {
        // Use default alias
        foreignKey: {
          name: 'feedId'
        }
      }),
        Comment.belongsTo(models.user, {
          // Use default alias
          foreignKey: {
            name: 'userId'
          }
        })
    }
  };
  Comment.init({
    userId: DataTypes.INTEGER,
    feedId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comment',
  });
  return Comment;
};