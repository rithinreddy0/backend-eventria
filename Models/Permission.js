const mongoose = require("mongoose")
const permissionSchema = new mongoose.Schema({
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    },
    subject:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    members:[{
        type:mongoose.Types.ObjectId,
        ref: 'Student'
    }],
    department:{
        type:String,
        enum:['cys-ds','automobile','civil','mechanical','cse','aimliot','eee','ece','eie','it'],
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        enum:["approved","disapproved","pending"],
        default:"pending"
    }
})
module.exports = mongoose.model("Permission",permissionSchema);