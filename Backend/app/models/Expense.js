const mongoose = require("mongoose")

const {Schema} = mongoose

const expenseSchema = new Schema({
    amount:{
        type:Number,
        required:true,
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    date:{
      type:Date,
      default:Date.now  
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    note:{
        type:String
    }
}, {timestamps:true})

const Expense = mongoose.model("Expense", expenseSchema)

module.exports = Expense