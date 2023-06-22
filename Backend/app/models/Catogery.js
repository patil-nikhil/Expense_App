const mongoose = require("mongoose")

const {Schema} = mongoose

const categorySchema = new Schema({
    title:{
        type:String,
        required:[true, "Category is Required"],
    },
    userId:{    
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category