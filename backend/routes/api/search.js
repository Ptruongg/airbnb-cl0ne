// const express = require('express');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { User, Spot, Review, Image, Booking, sequelize } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');


// const router = express.Router();
// const { Op } = require('sequelize')

// router.get("/", async (req, res) => {
//     const { q } = req.query.q

//     const keys = ["city", "state", "country"];

//     const search = (data) => {
//         return data.filter((item) =>
//         keys.some((key) => item[key].toLowerCase().includes(q)))
//     }
//     res.json(search(Spot))
// })
