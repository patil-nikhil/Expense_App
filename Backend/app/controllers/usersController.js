const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Expense = require("../models/Expense")
const Category = require("../models/Catogery")
// const Expense = require("../models/Expense")
require("dotenv").config()

const usersController = {}

usersController.register = async (req, res) => {
    try {
        const body = req.body
        const userObj = new User(body)
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(body.password, salt)
        userObj.password = hashPassword
        const user = await userObj.save()
        if (user) {
            res.json(user)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

usersController.login = async (req, res) => {
    try {
        const body = req.body
        const userObj = await User.findOne({ email: body.email })
        if (userObj) {
            const match = await bcrypt.compare(body.password, userObj.password)
            if (match) {
                const tokenData = {
                    id: userObj._id,
                    name: userObj.profile.username,
                    budget: userObj.budget
                }
                const token = jwt.sign(tokenData, process.env.JWT_SECRET)
                res.json({
                    token: `Bearer ${token}`
                })
            } else {
                res.json({
                    errors: "Invalid Email or Password"
                })
            }
        } else {
            res.json({
                errors: "Invalid Email or Password"
            })
        }
    } catch (error) {
        res.json(error)
    }
}

usersController.update = async (req, res) => {
    try {
        const body = req.body
        //Ensuring not to change email and password
        delete body.email
        delete body.password

        const userId = req.user.id
        const userObj = await User.findOneAndUpdate({ _id: userId }, body, { new: true, runValidators: true })
        if (userObj) {
            res.json(userObj)
        } else {
            res.json({})
        }

    } catch (error) {
        res.json(error)
    }
}

usersController.account = async (req, res) => {
    try {
        const id = req.user.id
        const user = await User.findById(id)
        if (user) {
            res.json(user)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

usersController.checkBudgetAvailability = async (req, res) => {
    try {
        const userId = req.user.id
        const body = req.body
        const result = await Promise.all([
            User.findById(userId),
            Expense.find({ userId: userId, isDeleted: false })
        ])
        const [userObj, expenses] = result
        const totalUsedBudget = expenses.reduce((pv, cv) => {
            return pv + cv.amount
        }, 0)

        const remainingBudget = userObj.budget - totalUsedBudget - body.amount

        if (remainingBudget > 0) {
            res.json({
                message: `Budget Remaining - ${remainingBudget}`
            })
        } else {
            res.json({
                error: `Budget limit is reached`
            })
        }

    } catch (error) {
        res.json(error)
    }
}

usersController.destroyAccount = async(req, res)=>{
    try {
        const id = req.user.id
        const body = req.body
        
        const userObj = await User.findById(id)
        const compare = await bcrypt.compare(body.password, userObj.password)

        if(compare){
            const deleteUser = User.findByIdAndDelete(id)
            const categories = Category.deleteMany({userId:id})
            const expense = Expense.deleteMany({userId:id})

            const deleteAll = await Promise.all([deleteUser, categories, expense])

            res.json(deleteAll)

        }else{
            res.json({
                error:"enter a valid password"
            })
        }

    } catch (error) {
        res.json(error)
    }
}


module.exports = usersController