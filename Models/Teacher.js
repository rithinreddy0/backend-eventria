const mongoose = require("mongoose");
const teeacherSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:32
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    staffno:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },

})
module.exports = mongoose.model('Teacher', teeacherSchema);