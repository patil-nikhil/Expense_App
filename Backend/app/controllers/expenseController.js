const Expense = require("../models/Expense")
const User = require("../models/User")

const expensesController = {}

expensesController.listAll = async (req, res) => {
    try {
        const userId = req.user.id
        const { type } = req.query
        let expenses
        if (type == "alive") {
            expenses = await Expense.find({ userId: userId, isDeleted: false })
        } else if (type == "deleted") {
            expenses = await Expense.find({ userId: userId, isDeleted: true })
        }
        if (expenses) {
            res.json(expenses)
        } else {
            res.json([])
        }
    } catch (error) {
        res.json(error)
    }
}

expensesController.create = async (req, res) => {
    try {
        const userId = req.user.id
        const body = req.body
        const categoryId = req.params.categoryId
        const expense = await Expense.create({ ...body, userId: userId, categoryId: categoryId })
        if (expense) {
            res.json(expense)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

expensesController.update = async (req, res) => {
    try {
        const body = req.body
        const id = req.params.id
        const userId = req.user.id
        const updatedExpense = await Expense.findOneAndUpdate({ _id: id, userId: userId }, body, { new: true, runValidators: true })
        if (updatedExpense) {
            res.json(updatedExpense)
        } else {
            res.json({})
        }

    } catch (error) {
        res.json(error)
    }
}

expensesController.destroy = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.id
        const { type } = req.query
        let expense
        if (type == "delete") {
            expense = await Expense.findOneAndUpdate({ _id: id, userId: userId }, { isDeleted: true }, { new: true, runValidators: true })
        }
        else if (type == "undo") {
            expense = await Expense.findOneAndUpdate({ _id: id, userId: userId }, { isDeleted: false }, { new: true, runValidators: true })
        }
        if (expense) {
            res.json(expense)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

expensesController.destroyAll = async (req, res) => {
    try {
        const id = req.user.id
        const { type } = req.query
        let deletedExpenses
        if (type == "permanent") {
            deletedExpenses = await Expense.deleteMany({ userId: id, isDeleted: true })
        } else if (type == "soft") {
            deletedExpenses = await Expense.updateMany({ userId: id }, { isDeleted: true })
        } else if (type == "undoAll") {
            deletedExpenses = await Expense.updateMany({ userId: id }, { isDeleted: false })
        }
        if (deletedExpenses) {
            res.json(deletedExpenses)
        } else {
            res.json([])
        }

    } catch (error) {
        res.json(error)
    }
}

expensesController.search = async (req, res) => {
    try {
        const text = req.query.text
        const id = req.user.id
        let expenses
        if (!text.length == 0) {
            expenses = await Expense.find({ userId: id, isDeleted: false, note: { $regex: text, $options: "i" } })
        } else {
            expenses = await Expense.find({ userId: id, isDeleted: false })
        }
        if (expenses) {
            res.json(expenses)
        } else {
            res.json([])
        }

    } catch (error) {
        res.json(error)
    }
}

expensesController.destroyByCategoryId = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.id
        const expenses = await Expense.deleteMany({ categoryId: id })
        if (expenses) {
            res.json(expenses)
        } else {
            res.json([])
        }
    } catch (error) {
        res.json(error)
    }
}

expensesController.sortExpenses = async (req, res) => {
    try {
        const userId = req.user.id
        const { text, order } = req.query
        if (text == "amount") {
            sortExpenses = await Expense.find({ userId: userId, isDeleted: false }).sort({ amount: order })
        } else if (text == "note") {
            sortExpenses = await Expense.find({ userId: userId, isDeleted: false }).sort({ note: order })
        } else if (text == "date") {
            sortExpenses = await Expense.find({ userId: userId, isDeleted: false }).sort({ date: order })
        }
        res.json(sortExpenses)
    } catch (error) {
        res.json(error)
    }
}



module.exports = expensesController