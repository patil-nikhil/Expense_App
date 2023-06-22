const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const configureDb = require("./config/database")
const router = require("./config/routes")
const port = 3055

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(port, (req, res)=>{
    console.log("Server is running on the port", port)
})


configureDb()