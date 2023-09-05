const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String, 
        required: true
    },
    gender:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    }

});

module.exports = mongoose.model("User", userSchema);