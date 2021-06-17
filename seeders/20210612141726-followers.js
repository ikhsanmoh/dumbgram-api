'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('followers', [
      {
        followerId: 1,
        followedId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerId: 1,
        followedId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerId: 1,
        followedId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerId: 2,
        followedId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerId: 2,
        followedId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerId: 2,
        followedId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerId: 3,
        followedId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerId: 3,
        followedId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerId: 4,
        followedId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        followerId: 5,
        followedId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
