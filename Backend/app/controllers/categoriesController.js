const Category = require("../models/Catogery")

const categoriesController = {}

categoriesController.list = async (req, res) => {
    try {
        const id = req.user.id
        const categories = await Category.find({ userId: id })
        if (categories) {
            res.json(categories)
        } else {
            res.json([])
        }
    } catch (error) {
        res.json(error)
    }
}

categoriesController.create = async (req, res) => {
    try {
        const body = req.body
        const id = req.user.id
        const categoryObj = new Category(body)
        categoryObj.userId = id
        const category = await categoryObj.save()
        if (category) {
            res.json(category)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

categoriesController.destroy = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.id
        const category = await Category.findOneAndDelete({ _id: id, userId: userId })
        if (category) {
            res.json(category)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e)
    }
}

module.exports = categoriesController



