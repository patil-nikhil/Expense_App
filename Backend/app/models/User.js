const mongoose = require("mongoose")
const validator = require("validator")
const Expense = require("../models/Expense")

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
    profile:{
        username:{
            type:String,
            required:true,
            minlength:5,
            maxlength:25,
            validate:{
                validator:function(value){
                    return validator.isAlpha(value)
                },
                message:function(value){
                    return {
                        errors:"Username Should Only Contain Letters"
                    }
                }
            }
        },
        phone:{
            type:String,
            required:true,
            minlength:10,
            maxlength:10,
            unique:[true, "Phone Number is Already Registered"]
        },
        occupation:{
            type:String,
            required:true,
            enum:["working", "student", "non-working"]
        },
        bio:{
            type:String
        }
    },
    budget:{
        type:Number,
        default:0
    }

})


const User = mongoose.model("User", userSchema)

module.exports = User