const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Image, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();
const { Op } = require('sequelize');
const { search } = require('./spot');

router.get("/", async(req, res, next) => {
    let spotName = req.params.name;
    Spot.find({name: spotName}, function (err, spots) {
        if(err) {
            return "Invalid Search"
        }
    })
})
