'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2023-4-16'),
        endDate: new Date('2023-4-20')
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2023-4-23'),
        endDate: new Date('2022-4-28')
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('2022-8-26'),
        endDate: new Date('2022-9-31')
      },

    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Bookings', {
       startDate: { [Op.in]: [new Date('2023-4-16'), new Date('2023-4-23'), new Date('2022-8-26')]
      },
    }, {});
  }
};
