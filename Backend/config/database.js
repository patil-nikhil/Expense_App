const mongoose = require("mongoose")

const configureDb = async()=>{
    try{
        const db = await mongoose.connect("mongodb://127.0.0.1:27017/Expense-App")
        console.log("Connected to the DB")
    }catch(e){
        console.log("Error While connecting to the DB")
    }

}

module.exports = configureDb