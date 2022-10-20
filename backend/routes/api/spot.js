const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Image, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();
const { Op } = require('sequelize')

//get all spots route
// router.get('/', async (req, res) => {
//     const spots = await Spot.findAll({
//         include: [Review]
//     })
//     return res.json(spots);

// })
// add query filters to get all spots
router.get("/", async (req, res) => {
    const pagination = {
      filter: [],
    };
    let { page, size, minPrice, maxPrice } =
      req.query;
    const error = {
      message: "Validation Error",
      statusCode: 400,
      errors: {},
    };

    page = Number(page);
    size = Number(size);

    if (Number.isNaN(page)) page = 0;
    if (Number.isNaN(size)) size = 20;

    if (page > 10) page = 10;
    if (size > 20) size = 20;

    if (page < 0) error.errors.page = "Page must be greater than or equal to 0";
    if (size < 0) error.errors.size = "Size must be greater than or equal to 0";
    // if (Number(maxLat) > 90) {
    //   error.errors.maxLat = "Maximum latitude is invalid";
    //   maxLat = false;
    // }
    // if (Number(minLat) < -90) {
    //   error.errors.maxLat = "Minimum latitude is invalid";
    //   minLng = false;
    // }
    // if (Number(maxLng) > 180) {
    //   error.errors.maxLng = "Maximum longitude is invalid";
    //   maxLng = false;
    // }

    // if (Number(minLng) < -180) {
    //     error.errors.minLng = "Minimum longitude is invalid";
    //     minLng = false;
    //   }
      if (Number(minPrice) < 0) {
        error.errors.minPrice = "Maximum price must be greater than 0";
        minPrice = false;
      }
      if (Number(maxPrice) < 0) {
        error.errors.maxPrice = "Minimum price must be greater than 0";
        maxPrice = false;
      }

      if (
        page < 0 ||
        size < 0 ||
        // (!maxLat && maxLat !== undefined) ||
        // (!minLat && minLat !== undefined) ||
        // (!maxLng && maxLng !== undefined) ||
        // (!minLng && minLng !== undefined) ||
        (!minPrice && minPrice !== undefined) ||
        (!maxPrice && maxPrice !== undefined)
      ) {
        res.status(400);
        res.json(error);
      }

      // if (maxLat) {
      //   pagination.filter.push({
      //     lat: { [Op.lte]: Number(maxLat) },
      //   });
      // }
      // if (minLat) {
      //   pagination.filter.push({
      //     lat: { [Op.gte]: Number(minLat) },
      //   });
      // }
      // if (minLng) {
      //   pagination.filter.push({
      //     lng: { [Op.gte]: Number(minLng) },
      //   });
      // }
      // if (maxLng) {
      //   pagination.filter.push({
      //     lng: { [Op.lte]: Number(maxLng) },
      //   });
      // }
      if (minPrice) {
        pagination.filter.push({
          price: { [Op.gte]: Number(minPrice) },
        });
      }
      if (maxPrice) {
        pagination.filter.push({
          price: { [Op.lte]: Number(maxPrice) },
        });
      }

      pagination.size = size;
      pagination.page = page;

      const spots = await Spot.findAll({
        where: {
          [Op.and]: pagination.filter,
        },
        limit: pagination.size,
        offset: pagination.size * pagination.page,
      });
      res.json({
        spots,
        page: pagination.page,
        size: pagination.size,
      });
});
//get all spots by current user
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: {ownerId: req.user.id}
    })
    return res.json(spots)
})

//get details of a spot from an id
router.get('/:id', async(req, res) => {
    const spot = await Spot.findByPk(req.params.id, {
        include: [{
                model: User,
                as: 'Owner',
                attributes: ['id']
        }]
    })
    if (!spot) {
        res.status(404).json("Spot Couldn't be found")

    }
    return res.json(spot)
})
//add an image to a spot based on the Spot's id
// router.post('/:id', requireAuth, async(req, res) => {
//     const spot = await Spot.findByPk(req.params.id, {
//         include: [{
//             model: Spot,
//             attributes: ['url', 'previewImage']
//         }]
//     })
// })

router.post('/', requireAuth, async(req, res) => {
    const { address, city, state, country, name, description, price } = req.body
    const error = {
        message: "Validation Error",
        statusCode: 400,
        errors: {}
    }
    if(!address) {
        error.errors.address = "Street address is required"
    }
    if(!city) {
        error.errors.address = "City is required"
    }
    if(!state) {
        error.errors.state = "State is required"
    }
    if(!country) {
        error.errors.country = "Country is required"
    }
    // if(!lat) {
    //     error.errors.lat = "Latittude is not valid"
    // }
    // if(!lng) {
    //     error.errors.lng = "Longitude is not valid"
    // }
    if(!name) {
        error.errors.name = "Name must be less than 50 characters"
    }
    if(!description) {
        error.errors.description = "Description is required"
    }
    if(!price) {
        error.errors.price = "Price per day is required"
    }
    if ( !address || !city || !state || !country || !name || !description || !price) {
        res.status(400).json(error)
    }

    const spot = await Spot.create({
        ownerId: req.user.id, address, city, state, country, name, description, price

    })
    return res.json(spot)
})

//add an image to a spot based on the Spot's id

router.post("/:spotId/images", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    where: {
      ownerId: req.user.id,
    },
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  };
  // get url from the request body
  const { url } = req.body;
  //create a query to find all images where the spot id matches
  const allImg = await Image.findAll({
    where: {
      [Op.and]: [{ spotId: req.params.spotId }],
    },
  });
  //create an image and add it to our db adding 1 to the id
  const image = await Image.create({
    imageId: allImg.length + 1,
    url,
  });
  //return that img
  res.json(image);
});

//edit a spot
router.put("/:spotId", requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
      previewImage,
    } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }

    const error = {
      message: "Validation Error",
      statusCode: 400,
      errors: {},
    };

    if (!address) error.errors.address = "Street address is required";
    if (!city) error.errors.city = "City is required";
    if (!state) error.errors.state = "State is required";
    if (!country) error.errors.country = "Country is required";
    // if (!lat) error.errors.lat = "Latitude is not valid";
    // if (!lng) error.errors.lng = "Longitude is not valid";
    if (!name) error.errors.name = "Name must be less than 50 characters";
    if (!description) error.errors.description = "Description is required";
    if (!price) error.errors.price = "Price per day is required";

    if (
      !address ||
      !city ||
      !state ||
      !country ||
      !name ||
      !description ||
      !price
    ) {
      res.statusCode = 400;
      return res.json(error);
    }

    await spot.update({
      address,
      city,
      state,
      country,
      name,
      description,
      price,
      previewImage,
    });
    res.json(spot);
});

router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)
    if(!spot) {
      res.status(404);
      res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }

    spot.destroy();
    res.json({
      message: "Successfully Deleted",
      statusCode: 200
    })
})


module.exports = router;
