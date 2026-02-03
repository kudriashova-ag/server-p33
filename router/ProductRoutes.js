const express = require('express')
const ProductController = require('../controllers/ProductController')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/products', ProductController.all)
router.post('/products',  ProductController.create)
router.get('/products/:id', ProductController.getById)
router.put('/products/:id', ProductController.update)
router.delete('/products/:id', ProductController.remove)

module.exports = router