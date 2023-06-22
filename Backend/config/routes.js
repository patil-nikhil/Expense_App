const express = require("express")
const usersController = require("../app/controllers/usersController")
const authenticateUser = require("../app/middlewares/authenticateUser")
const categoriesController = require("../app/controllers/categoriesController")
const expensesController = require("../app/controllers/expenseController")

const router = express.Router()

//APi's For Users
router.post("/api/users/register", usersController.register)
router.post("/api/users/login", usersController.login)
router.put("/api/users/update",authenticateUser, usersController.update)
router.get("/api/users/account", authenticateUser, usersController.account)
router.post("/api/users/checkBudgetAvailability", authenticateUser, usersController.checkBudgetAvailability)
router.post("/api/users/deleteAccount", authenticateUser, usersController.destroyAccount)

//Api's For Categories
router.get("/api/categories", authenticateUser, categoriesController.list)
router.post("/api/categories", authenticateUser, categoriesController.create)
router.delete("/api/categories/:id", authenticateUser, categoriesController.destroy)

//Api's for Expenses
router.get("/api/expenses", authenticateUser, expensesController.listAll)
router.delete("/api/expenses/deleteAll", authenticateUser, expensesController.destroyAll)
router.get("/api/expenses/search" ,authenticateUser, expensesController.search)
router.put("/api/expenses/:id", authenticateUser, expensesController.update)
router.delete("/api/expenses/:id", authenticateUser, expensesController.destroy)
router.delete("/api/expenses/category/:id", authenticateUser, expensesController.destroyByCategoryId)
router.post("/api/expenses/:categoryId", authenticateUser, expensesController.create)
router.get("/api/sort/expenses", authenticateUser, expensesController.sortExpenses)


module.exports = router

