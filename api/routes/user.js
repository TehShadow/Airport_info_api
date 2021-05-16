const express = require('express')
const router = express.Router()
const userController = require("../controllers/users")
const AuthMiddleware = require("../middleware/auth")


router.post('/signup',userController.user_signup)

router.post('/login',userController.user_login)

router.put('/delete/:user_id',AuthMiddleware,userController.user_delete)

module.exports = router;