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
   return queryInterface.bulkInsert('Reviews', [
    {
      userId: 1,
      spotId: 1,
      review: 'Great weekend trip and very comfy home.',
      stars: 4
    },
    {
      userId: 2,
      spotId: 2,
      review: 'Loved the view and the area. It was great for big groups.',
      stars: 2
    },
    {
      userId: 3,
      spotId: 3,
      review: 'This place is lit.',
      stars: 2
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
     return queryInterface.bulkDelete('Reviews', {
       userId: { [Op.in]: [1, 2, 3, 4, 5] },
    }, {});
  }
};
