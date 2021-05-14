const mongoose = require("mongoose");
const express = require('express')
const router = express.Router()
const AirportController = require('../controllers/airport')


router.get("/iata/:iata", AirportController.get_by_iata)

router.get("/country/:code", AirportController.get_by_country)

router.get("/name/:nameSearch", AirportController.get_by_name)

module.exports = router;