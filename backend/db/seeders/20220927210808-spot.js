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
    return queryInterface.bulkInsert('Spots', [
      {
        "ownerId": 1,
        "address": "123 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy",
        "description": "Place where web developers are created",
        "price": 123,
        "avgRating": 4.5,
        "previewImage": "https://2traveldads.com/wp-content/uploads/2017/07/Goofys-House-in-Toontown-Disneyland-1.jpg"
      },
      {
        "ownerId": 2,
        "address": "556 Breeze Wy",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645556,
        "lng": -122.4730331,
        "name": "Raven Bar",
        "description": "Chill hangout spot for friends",
        "price": 565,
        "avgRating": 4.8,
        "previewImage": "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt9834851b906877fe/6082129712dc9d3c683578ec/4_27_2021_Patch2.8Article_Banner.jpg"
      },
      {
        "ownerId": 3,
        "address": "532 Haven Ave",
        "city": "San Diego",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645556,
        "lng": -122.4730331,
        "name": "Hola",
        "description": "quiet place for family",
        "price": 3565,
        "avgRating": 3.5,
        "previewImage": "https://www.technewstoday.com/wp-content/uploads/2022/03/haven-1.jpg"
      },
      {
        "ownerId": 4,
        "address": "7901 Ascent Rd",
        "city": "Los Angeles",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645556,
        "lng": -122.4734331,
        "name": "Watch this",
        "description": "It's lit",
        "price": 9005,
        "avgRating": 5.0,
        "previewImage": "https://www.mandatory.gg/wp-content/uploads/news/2020/06/ascent/valorant-map-ascent-centre-768x432.jpg"
      },
      {
        "ownerId": 5,
        "address": "2868 Bind Ct",
        "city": "San Jose",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645556,
        "lng": -122.478331,
        "name": "Bill Graham Civic Auditorium",
        "description": "Very nice and peaceful place to cry. Listen to your favorite Illenium song",
        "price": 10000,
        "avgRating": 0.05,
        "previewImage": "https://media-cdn.tripadvisor.com/media/photo-s/0f/67/6c/17/bill-graham-civic-auditorium.jpg"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', {
      ownerId: {[Op.in]: [1,2,3,4,5]}
    })
  }
};
