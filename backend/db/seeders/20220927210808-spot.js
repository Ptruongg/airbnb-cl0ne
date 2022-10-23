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
        // "lat": 37.7645358,
        // "lng": -122.4730327,
        "name": "App Academy",
        "description": "Welcome to Casa de Manzanita! Step into a romantic getaway that has been tastefully remodeled with modern charm! A cozy studio with a modern kitchen with everything you need including a coffee bar, a modern bathroom with a rainfall shower and a private jacuzzi in the backyard.",
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
        // "lat": 37.7645556,
        // "lng": -122.4730331,
        "name": "Raven Bar",
        "description": "The Arnold Hideout Cabin is a one-of-a-kind home, located a short drive from the Big Trees and Wine country. Remodeled in 2021 this is a home with such an elevated look and feel. Designed with beautiful materials and furnished with modern and rustic pieces the Cabin sleeps 8. The interior is a open-plan. An expansive back new patio with a Hot Tub, Fire pit, BBQ and table. All upscale cookware, appliances, mattresses and Linens. Our home is equipped with a central heat and AC.",
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
        // "lat": 37.7645556,
        // "lng": -122.4730331,
        "name": "Hola",
        "description": "This beautiful, pet- friendly condo has a luxury contemporary vibe with two bedrooms and two bathrooms. Perfect for any season when visiting Mammoth. This condo is located walking distance to Canyon Lodge at Mammoth Mountain Ski Area, right on the Ski Back Trail. During the summer, you can visit the Lakes Basin, or a day trip to Yosemite. Large flat screen tv, fully equipped kitchen, luxury beds, plus a common area game room, pool and hot tub. Make this your perfect Mammoth getaway!",
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
        // "lat": 37.7645556,
        // "lng": -122.4734331,
        "name": "Watch this",
        "description": "Located right in the heart of downtown, and only 32 miles from the Arch Rock Entrance to Yosemite! Built in 1938 with original wood floors and lots of stories. Enjoy this private and peaceful Bunglow tucked quietly off of the historic downtown main street of Mariposa. With a giant King sized bed, fully accessible bathroom 'oasis', full kitchen, private patio, and sleeper sofa- this vintage hideaway beckons you to relax and unwind after a full day of Yosemite/Mariposa adventures..",
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
        // "lat": 37.7645556,
        // "lng": -122.478331,
        "name": "Bill Graham Civic Auditorium",
        "description": "This breathtaking, cozy retreat nestled in the woods of beautiful Alpine County offers the quintessential cabin experience with the added benefit of stunning mountain views and incredible luxuries! Sip your morning coffee on the vast deck before setting out for an invigorating day of hiking, fishing, or skiing. Enjoy a movie or foosball game, then fire up the grill for a backyard barbecue on the private patio under the stars. We can’t wait to welcome you for your next family or group getaway!",
        "price": 1000,
        "avgRating": 0.05,
        "previewImage": "https://media-cdn.tripadvisor.com/media/photo-s/0f/67/6c/17/bill-graham-civic-auditorium.jpg"
      },
      {
        "ownerId": 6,
        "address": "3412 Icebox Lane",
        "city": "Los Angeles",
        "state": "California",
        "country": "United States of America",
        // "lat": 37.7645556,
        // "lng": -122.478331,
        "name": "My heaven",
        "description": "Beautiful light-filled contemporary house with incredible lake views, two large decks, hot tub under the stars, fireplace, gas bbq, chef's kitchen, luxurious bedding / bathrooms, laundry room, *high-speed* internet.",
        "price": 325,
        "avgRating": 4.25,
        "previewImage": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/top-airbnb-alternatives-2021-1613057911.jpg"
      },
      {
        "ownerId": 7,
        "address": "331 Teahole",
        "city": "Tahoe",
        "state": "California",
        "country": "United States of America",
        // "lat": 37.7645556,
        // "lng": -122.478331,
        "name": "Lake Tahoe Chalet",
        "description": "Ready for the ultimate luxury home that also happens to be dog friendly? Owner loves dogs! Bring the whole family to his 4 bedroom, 3 bathroom fully fenced home that sleeps 10 total. This home is more like a manor than your typical Tahoe cabin. Situation in the exclusive Zephyr Cove Heights neighborhood, you are close to the lake, casinos, Heavenly Ski Resort and everything the South shore of Tahoe has to offer. The owners of this home gutted it when they bought it so everything is brand new and high end. The kitchen is fully stocked and this home pretty much has everything you’d ever need.",
        "price": 1250,
        "avgRating": 4.65,
        "previewImage": "https://a0.muscache.com/im/pictures/fe13b749-ad2b-45fb-af19-a91e81250dcb.jpg?im_w=1200"
      },
      {
        "ownerId": 8,
        "address": "1225 Maribelle Rd.",
        "city": "San Jose",
        "state": "California",
        "country": "United States of America",
        // "lat": 37.7645556,
        // "lng": -122.478331,
        "name": "Maribelle",
        "description": "This breathtaking, cozy retreat nestled in the woods of beautiful Alpine County offers the quintessential cabin experience with the added benefit of stunning mountain views and incredible luxuries! Sip your morning coffee on the vast deck before setting out for an invigorating day of hiking, fishing, or skiing. Enjoy a movie or foosball game, then fire up the grill for a backyard barbecue on the private patio under the stars. We can’t wait to welcome you for your next family or group getaway!",
        "price": 875,
        "avgRating": 5.0,
        "previewImage": "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53153894/original/36abaefb-86c5-409e-ad25-7fbdf80fd29d.jpeg?im_w=1200"
      },
      {
        "ownerId": 9,
        "address": "2868 Bind Ct",
        "city": "San Diego",
        "state": "California",
        "country": "United States of America",
        // "lat": 37.7645556,
        // "lng": -122.478331,
        "name": "Bill Graham Civic Auditorium",
        "description": "This breathtaking, cozy retreat nestled in the woods of beautiful Alpine County offers the quintessential cabin experience with the added benefit of stunning mountain views and incredible luxuries! Sip your morning coffee on the vast deck before setting out for an invigorating day of hiking, fishing, or skiing. Enjoy a movie or foosball game, then fire up the grill for a backyard barbecue on the private patio under the stars. We can’t wait to welcome you for your next family or group getaway!",
        "price": 785,
        "avgRating": 3.76,
        "previewImage": "https://media-cdn.tripadvisor.com/media/photo-s/0f/67/6c/17/bill-graham-civic-auditorium.jpg"
      },
      {
        "ownerId": 10,
        "address": "578 Pearl Ave.",
        "city": "Lake Tahoe",
        "state": "California",
        "country": "United States of America",
        // "lat": 37.7645556,
        // "lng": -122.478331,
        "name": "Pearl Heights",
        "description": "A-Frame gem with Lake rights tucked away in the trees of Lake Arrowhead on an acre of land. Newly renovated with modern features and stylish decor. Close to the lake, hiking, restaurants & shopping areas. Ideal location for all your Summer & Winter adventures. Cozy up by the wood burning fireplace in winter or open the doors to the deck in summer--w AC. This cabin is a soulful 5-star resort level top to bottom.Our Airbnb manager or myself will be avail if you need assistance during your stay.",
        "price": 100000,
        "avgRating": 5.00,
        "previewImage": "https://a0.muscache.com/im/pictures/miso/Hosting-47818404/original/54edef36-4b46-44c0-964a-031bbfb930f9.jpeg?im_w=1200"
      },
      {
        "ownerId": 11,
        "address": "4010 Woodland Lane",
        "city": "Las Vegas",
        "state": "Neveda",
        "country": "United States of America",
        // "lat": 37.7645556,
        // "lng": -122.478331,
        "name": "Get Litty with the homies",
        "description": "Celebrate your family vacation or reunion here. Completely refurnished with brand new furnishings, lights and linens. Huge yard, hot tub, dock, boat lift, sleeps 14!",
        "price": 10000,
        "avgRating": 0.05,
        "previewImage": "https://a0.muscache.com/im/pictures/654caf80-3e06-47b1-962a-e6c849c44644.jpg?im_w=960"
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
