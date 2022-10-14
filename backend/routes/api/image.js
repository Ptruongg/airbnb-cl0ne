const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, Booking, Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');

const router = express.Router()
const { Op } = require('sequelize')

//Add an image to a Review based on the Review's Id
router.post("/reviews/:reviewId", requireAuth, async (req, res) => {
  const currentUserId = req.user.id;
  const reviewId = req.params.reviewId;

  let review = await Review.findByPk(reviewId);
  if (!review) {
    res.status(404);
    res.json({
      message: "Review does not exist",
    });
  }

  if (review.userId !== currentUserId) {
    res.status(403);
    res.json({
      message: "Authorization Required",
    });
  }

  const allImg = await Image.findAll({
    where: {
      [Op.and]: [
        { reviewId: req.params.reviewId },
      ],
    },
  });

  if (allImg.length > 10) {
    res.status(400);
    res.json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 400,
    });
  }

  const { url } = req.body;

  const image = await Image.create({
    imageId: allImg.length + 1,
    url,
  });

  res.json(image);
});


  //delete an image on spotId
  router.delete("/spots/:imageId", requireAuth, async (req, res) => {

    const imageId = req.params.imageId;

    const images = await Image.findByPk(imageId);

    if (!images) {
      res.status(404);
      res.json({
        message: "Image couldn't be found",
        statusCode: 404,
      });
    }
    // if (images.imageableId !== currentUserId) {
    //   res.status(403);
    //   res.json({
    //     message: "Forbidden",
    //     statusCode: 403,
    //   });
    // }

    await images.destroy({
      where: {
        id: imageId,
      },
    });

    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
});

//delete an image from reviews
router.delete("/reviews/:imageId", requireAuth, async (req, res) => {

  const imageId = req.params.imageId;

  const images = await Image.findByPk(imageId);

  if (!images) {
    res.status(404);
    res.json({
      message: "Image couldn't be found",
      statusCode: 404,
    });
  }
  // if (images.imageableId !== currentUserId) {
  //   res.status(403);
  //   res.json({
  //     message: "Forbidden",
  //     statusCode: 403,
  //   });
  // }

  await images.destroy({
    where: {
      id: imageId,
    },
  });

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

  module.exports = router;
