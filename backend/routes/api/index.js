const router = require('express').Router();

const { restoreUser, requireAuth } = require("../../utils/auth.js");
const sessionRouter = require('./session.js');
const usersRouter = require('./user.js');
const spotsRouter = require('./spot.js');
const reviewsRouter = require('./review.js');
const bookingsRouter = require('./booking.js');
const imagesRouter = require('./image.js')
// const searchRouter = require('./search.js')

const { User, Spot, Review, Booking, Image } = require('../../db/models');

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

router.use('/images', imagesRouter);

// router.use('/search', searchRouter)

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});
// GET /api/restore-user (must be connected before any other middleware or route handlers)
router.get('/restore-user', (req, res) => {
    return res.json(req.user);
  });

router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user });
});


router.get('/require-auth', requireAuth, (req, res) => {
  return res.json(req.user);
});


module.exports = router;
