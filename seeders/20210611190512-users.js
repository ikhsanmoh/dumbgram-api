const bcrypt = require('bcrypt')
const hashStrenght = 10

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
        password: await bcrypt.hash('77777777', hashStrenght),
        image: 'ronaldo.jpg',
        bio: "Just a football player who likes to score.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Messi',
        email: 'messi@app.com',
        password: await bcrypt.hash('10101010', hashStrenght),
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
        password: await bcrypt.hash('11111111', hashStrenght),
        image: 'neymar.jpg',
        bio: "Just a football player who likes to dive.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Fabregas',
        email: 'fabregas@app.com',
        username: 'fabregas4',
        password: await bcrypt.hash('44444444', hashStrenght),
        image: 'fabregas.jpg',
        bio: "Just a football player who likes to pass the ball",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Ramos',
        email: 'ramosamos@app.com',
        username: 'ramos4',
        password: await bcrypt.hash('44444444', hashStrenght),
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
