const Article = require("../models/Article")

const all = async (req, res) => {
    const articles = await Article.find({})
    res.status(200).json({
        data: articles
    })
}

const getById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
        res.status(200).json({
            data: article
        })
    }
    catch (error) {
        return res.status(404).json({
            error: {
                message: "Article not Found"
            }
        })
    }
}


const create = async (req, res) => {
    try {
        const article = new Article(req.body)
        const savedArticle = await article.save()

        res.status(201).json({
            data: savedArticle
        })
    }
    catch (error) {
        return res.status(400).json({
            error: {
                message: error.message
            }
        })
    }
}

const update = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.status(200).json({
            data: article
        })
    }
    catch (error) {
        return res.status(404).json({
            error: {
                message: "Article Not Found"
            }
        })
    }
}
const remove = async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id)
        res.status(204).send()
    }
    catch (error) {
        return res.status(404).json({
            error: {
                message: "Article Not Found"
            }
        })
    }
}

module.exports = { all, getById, create, update, remove }