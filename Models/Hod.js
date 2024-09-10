const mongoose = require("mongoose")
const hodschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    department:{
        type:String,
        enum:['cys-ds','automobile','civil','mechanical','cse','aimliot','eee','ece','eie','it'],
        required:true
    },
    phoneno:{
        type:Number,
    }
})
module.exports = mongoose.model("Hod",hodschema)