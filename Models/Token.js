const mongoose = require("mongoose");
const token_schema = new mongoose.Schema({
    token:{
        type:String,
        required:true

    },
    studentId:{
        type:mongoose.Types.ObjectId,
        ref:"Student",
        required:true
    },
    eventId:{
        type:mongoose.Types.ObjectId,
        ref:"Event",
        required:true
    }
})
module.exports = mongoose.model("Token",token_schema)