const Product = require("../models/Product")

const all = async (req, res) => {
    
    const products = await Product.find({})
    res.status(200).json({
        data: products
    })
}

const getById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({
            data: product
        })
    }
    catch (error) {
        return res.status(404).json({
            error: {
                message: "Product not Found"
            }
        })
    }
}

const create = async (req, res) => {
    try {
        const product = new Product(req.body)
        const savedProduct = await product.save()

        res.status(201).json({
            data: savedProduct
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
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.status(200).json({
            data: product
        })
    }
    catch (error) {
        return res.status(404).json({
            error: {
                message: "Product Not Found"
            }
        })
    }
}
const remove = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(204).send()
    }
    catch (error) {
        return res.status(404).json({
            error: {
                message: "Product Not Found"
            }
        })
    }
}

module.exports = { all, getById, create, update, remove }