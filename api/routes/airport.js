const express = require('express')
const router = express.Router()
const AirportController = require('../controllers/airport')
const AuthMiddleware = require("../middleware/auth")


router.get("/iata/:iata",AuthMiddleware ,AirportController.get_by_iata)

router.get("/country/:code",AuthMiddleware ,AirportController.get_by_country)

router.get("/name/:nameSearch",AuthMiddleware ,AirportController.get_by_name)

module.exports = router;