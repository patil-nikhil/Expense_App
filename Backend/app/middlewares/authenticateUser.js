const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticateUser = async(req, res, next)=>{
    try {
        const token = req.header("Auth").split(" ")[1]
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenData){
            req.user = {
                id:tokenData.id
            }
            next()
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = authenticateUser