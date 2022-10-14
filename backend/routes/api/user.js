const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Booking} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.get('/', requireAuth, async (req, res) => {
  const user = {
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    username: req.user.username
  }
  return res.json(user)
})


//sign-up
router.post('/', validateSignup, async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      let errors = [];

      const dupEmail = await User.findOne({
        where: {email}
      })
      if(dupEmail) {
        errors.push("User with that email already exists")
      }

      const dupUsername = await User.findOne({
        where: {username}
      })
      if(dupUsername) {
        errors.push("User with that username already exists")
      }

      if(errors.length) {
        res.status(403).json(errors)
      }

      const user = await User.signup({ email, username, password, firstName, lastName });

      await setTokenCookie(res, user);

      return res.json({
        user
      });
  }
);


module.exports = router;
