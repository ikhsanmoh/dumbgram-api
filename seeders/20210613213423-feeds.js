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
    await queryInterface.bulkInsert('feeds', [
      {
        userId: 1,
        fileName: 'file-one.jpg',
        caption: 'Train Hard!!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        fileName: 'file-two.jpg',
        caption: 'Road to Final!!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        fileName: 'file(1).jpg',
        caption: 'Family time...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        fileName: 'game-1.jpg',
        caption: 'Lets play togather!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        fileName: 'game-2.jpg',
        caption: '5 Winstrike!!!!!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        fileName: 'fashion-1.jpg',
        caption: 'New Suit...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        fileName: 'fashion-2.jpg',
        caption: '',
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
