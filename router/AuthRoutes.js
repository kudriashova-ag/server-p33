const express = require('express')
const AuthController = require('../controllers/AuthController')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/auth-user', auth, AuthController.getAuthUser)

module.exports = router