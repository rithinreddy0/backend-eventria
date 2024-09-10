const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    rollno:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    className:{
        type:String,
        enum:['cys','ds','automobile','civil','mechanical','cse','aiml','iot','ece','eie','it','aids',],
    },
    year:{
        type:Number,
        enum:[1,2,3,4],
    },
    section:{
        type:String,
        enum:['A','B','C','D'],
        default:"A"
    },
    password:{
        type:String,
        required:true
    },
    enorlled_events:[{
        type:mongoose.Types.ObjectId,
        ref:"Event"
    }]
})
module.exports = mongoose.model("Student",studentSchema);