'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'demo',
        lastName: 'user',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'fake',
        lastName: 'user1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'fake',
        lastName: 'user2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'philipt@gmail.com',
        username: 'ptruong',
        firstName: 'Philip',
        lastName: 'Truong',
        hashedPassword: bcrypt.hashSync('password4')
      },{
        email: 'minayeon@gmial.com',
        username: 'minayeon',
        firstName: 'Mina',
        lastName: 'Nayeon',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], {});
  },

  async down (queryInterface, Sequelize)  {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'ptruong', 'minayeon'] }
    }, {});
  }
};
