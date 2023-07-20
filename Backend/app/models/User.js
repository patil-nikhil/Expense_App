const mongoose = require("mongoose")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:[true, "Email is Already Taken"],
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(value){
                return {
                    errors:"Provide a Valid Email Id"
                }
            }
        }
    },
    password:{
        type:String,
        minlength:8,
        maxlength:128,
        required:true
    },
    budget:{
        type:Number,
        default:0
    }

})


const User = mongoose.model("User", userSchema)

module.exports = User