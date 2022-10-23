const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();
//get all reviews

router.get("/", async(req, res) => {
  const allReviews = await Review.findAll()
  res.json(allReviews);
})
//get all reviews of current user
router.get("/current-user-review", requireAuth, async (req, res) => {
    const {id} = req.user;

    const reviews = await Review.findAll({
      include: [
        {
          model: Spot,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'previewImage']
          }
        },
        // {
        //   model: Image,
        //   attributes: ['url']
        // }
      ],
      where: {
        userId: id
      }
    })
    res.json(reviews)
});

// get all reviews by a Spot's id
router.get('/:spotId', async(req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    if(!spot) {
        res.status(404).json("Spot couldn't be found")
    }

    const reviews = await Review.findAll({
        where: {
            spotId: spotId
        }
    })

    const user = await User.findByPk(spotId)
    return res.json({reviews, user})
});

//create a review for a Spot based on the Spot's Id
router.post('/:spotId/create', requireAuth, async(req, res) => {
    const spotId = req.params.spotId
    const userId = req.user.id
    const {review, stars} = req.body

    const currentSpot = await Spot.findOne({
        where: {id: spotId}
    })

    const currentUserReview = await Review.findOne({
        where: {
            userId: userId,
            spotId: spotId
        }
    })


    if(!currentSpot) {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if(!review) {
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
            "review": "Review text is required",
            }
        })
    }
    if(stars < 1 || stars > 5) {
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "stars": "Stars must be an integer from 1 to 5"
            }
        })
    }
    if(currentUserReview) {
        res.json(
            {
                "message": "User already has a review for this spot",
                "statusCode": 403
            }
        )
    }

    const newReview = await Review.create({
        userId: userId,
        spotId: spotId,
        review,
        stars
    })

    return res.json(newReview)

});



//edit a spot
router.put('/:reviewId', requireAuth, async(req, res) => {
    let { stars } = req.body;
    let reviewId = req.params.reviewId;
    let reviewParams = req.body;

    if (stars < 1 || stars > 5) {
      res.status(400);
      res.json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
          "review": "Review text is required",
          "stars": "Stars must be an integer from 1 to 5",
        }
      })
    }

    let review = await Review.findByPk(reviewId);

    if (!review) {
      res.status(404);
      res.json({
        message: "Review couldn't be found",
        statusCode: 404
      })
    }

    review = await Review.update(reviewParams, {
      where: {
        id: reviewId
      }
    });

    review = await Review.findByPk(reviewId);

    res.json(review)

});

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    // const id = req.user.id

    const review = await Review.findOne({
      where: {id : reviewId}
    })


    if (!review) {
      res.status(404);
      res.json({
        "message": "Review couldn't be found",
        "statusCode": 404
      })
    }

    await review.destroy();
    await review.save();

    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  })

module.exports = router;
