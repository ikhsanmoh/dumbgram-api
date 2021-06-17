'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.follower, {
        as: 'followers',
        foreignKey: {
          name: 'followerId'
        }
      }),
        User.hasMany(models.follower, {
          as: 'followed_users',
          foreignKey: {
            name: 'followedId'
          }
        }),
        User.hasMany(models.feed, {
          as: 'feeds',
          foreignKey: {
            name: 'userId'
          }
        }),
        User.hasMany(models.comment, {
          // Use default alias
          foreignKey: {
            name: 'userId'
          }
        })
    }
  };
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};