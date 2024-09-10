const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    stime:{
        type:String,
        required:true
    },
    etime:{
        type:String,
        required:true
    },
    created_by:{
        type:mongoose.Types.ObjectId,
        ref:"Organizer"
    },
    students_enrolled:[{
        type:mongoose.Types.ObjectId,
        ref:"Student"
    }],
    students_attended:[{
        type:mongoose.Types.ObjectId,
        ref:"Student"
    }],
    formcode:{
        type:String,
        required:true
    },
    
})
module.exports =  mongoose.model('Event',eventSchema)