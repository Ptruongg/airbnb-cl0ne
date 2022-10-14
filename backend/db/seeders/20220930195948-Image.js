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
    return queryInterface.bulkInsert('Images', [
      {
        imageId: 1,
        url: "https://2traveldads.com/wp-content/uploads/2017/07/Goofys-House-in-Toontown-Disneyland-1.jpg",
        preview: true,
        spotId: 1,
        reviewId: 1
      },
      {
        imageId: 2,
        url: "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt9834851b906877fe/6082129712dc9d3c683578ec/4_27_2021_Patch2.8Article_Banner.jpg",
        preview: true,
        spotId: 2,
        reviewId: 2
      },
      {
        imageId: 3,
        url: "https://www.technewstoday.com/wp-content/uploads/2022/03/haven-1.jpg",
        preview: true,
        spotId: 3,
        reviewId: 3
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op
    return queryInterface.bulkDelete('Images', {
      spotId: {[Op.in]: [1,2,3,4,5]},
      reviewId: {[Op.in]: [1,2,3,4,5]}
    })
  }
};
