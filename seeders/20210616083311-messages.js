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
    await queryInterface.bulkInsert('messages', [
      {
        senderId: 1,
        receiverId: 2,
        message: 'Hi!',
        createdAt: '2021-06-16 08:57:56',
        updatedAt: new Date()
      },
      {
        senderId: 1,
        receiverId: 2,
        message: 'Lets have a dinner this weekend.',
        createdAt: '2021-06-16 08:58:56',
        updatedAt: new Date()
      },
      {
        senderId: 2,
        receiverId: 1,
        message: 'Sure:)',
        createdAt: '2021-06-16 08:59:34',
        updatedAt: new Date()
      },
      {
        senderId: 2,
        receiverId: 1,
        message: 'Can I bring my family two?',
        createdAt: '2021-06-16 09:01:23',
        updatedAt: new Date()
      },
      {
        senderId: 1,
        receiverId: 2,
        message: 'yeahh, no problem.. itll be a quality time ;D',
        createdAt: '2021-06-16 09:02:46',
        updatedAt: new Date()
      },
      {
        senderId: 5,
        receiverId: 1,
        message: 'Hey Ron, are you free this weekend?',
        createdAt: '2021-06-16 13:03:51',
        updatedAt: new Date()
      },
      {
        senderId: 1,
        receiverId: 5,
        message: 'Im sorry, I have a dinner with messi and his family this weekend :(',
        createdAt: '2021-06-16 13:05:36',
        updatedAt: new Date()
      },
      {
        senderId: 5,
        receiverId: 1,
        message: 'ooh, oke no problem bro.',
        createdAt: '2021-06-16 13:06:26',
        updatedAt: new Date()
      },
      {
        senderId: 1,
        receiverId: 5,
        message: 'You can join us if you want :D',
        createdAt: '2021-06-16 13:06:57',
        updatedAt: new Date()
      },
      {
        senderId: 5,
        receiverId: 1,
        message: 'Nah bro, Im good.. you know messi and I doesnt really talk each other.',
        createdAt: '2021-06-16 13:07:46',
        updatedAt: new Date()
      },
      {
        senderId: 1,
        receiverId: 5,
        message: 'ohh yeah I forgot.. thats a shame :(',
        createdAt: '2021-06-16 13:08:46',
        updatedAt: new Date()
      },
      {
        senderId: 5,
        receiverId: 1,
        message: 'Its Ok bro dont worry about me, enjoy your weekend ;)',
        createdAt: '2021-06-16 13:09:46',
        updatedAt: new Date()
      },
      {
        senderId: 3,
        receiverId: 1,
        message: 'Heyy my friend, I heard you gonna have a dinner with messi this weekend, am I right?',
        createdAt: '2021-06-16 15:37:34',
        updatedAt: new Date()
      },
      {
        senderId: 1,
        receiverId: 3,
        message: 'yeah.',
        createdAt: '2021-06-16 17:32:46',
        updatedAt: new Date()
      },
      {
        senderId: 3,
        receiverId: 1,
        message: 'Can I join :D',
        createdAt: '2021-06-16 17:33:34',
        updatedAt: new Date()
      },
      {
        senderId: 1,
        receiverId: 3,
        message: 'No.',
        createdAt: '2021-06-16 20:04:35',
        updatedAt: new Date()
      },
      {
        senderId: 1,
        receiverId: 3,
        message: 'ohh, oke... :(',
        createdAt: '2021-06-16 20:05:06',
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
