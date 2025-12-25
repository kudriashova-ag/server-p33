const express = require('express')
const ArticleController = require('../controllers/ArticleController')
const router = express.Router()

router.get('/articles', ArticleController.all)
router.post('/articles', ArticleController.create)
router.get('/articles/:id', ArticleController.getById)
router.put('/articles/:id', ArticleController.update)
router.delete('/articles/:id', ArticleController.remove)


module.exports = router