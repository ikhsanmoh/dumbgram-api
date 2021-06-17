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
    await queryInterface.bulkInsert('comments', [
      {
        userId: 2,
        feedId: 1,
        comment: 'Keep it up!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        feedId: 2,
        comment: 'Lets gooo!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        feedId: 2,
        comment: 'Kill it!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        feedId: 3,
        comment: 'Nice..',
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
