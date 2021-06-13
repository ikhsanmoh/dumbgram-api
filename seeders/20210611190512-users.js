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
    await queryInterface.bulkInsert('users', [
      {
        fullName: 'Ronaldo',
        email: 'ronaldo@app.com',
        username: 'ranaldo7',
        password: '77777777',
        image: 'ronaldo.jpg',
        bio: "Just a football player who likes to score.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Messi',
        email: 'messi@app.com',
        password: '10101010',
        username: 'messi10',
        image: 'messi.jpg',
        bio: "Just a football player who likes to dribble.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Neymar',
        email: 'neymar@app.com',
        username: 'neymar11',
        password: '11111111',
        image: 'neymar.jpg',
        bio: "Just a football player who likes to dive.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Fabregas',
        email: 'fabregas@app.com',
        username: 'fabregas4',
        password: '44444444',
        image: 'fabregas.jpg',
        bio: "Just a football player who likes to pass the ball",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Ramos',
        email: 'ramosamos@app.com',
        username: 'ramos4',
        password: '44444444',
        image: 'ramos.jpg',
        bio: "Just a football player who likes to provoke.",
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
