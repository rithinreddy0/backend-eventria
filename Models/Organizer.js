const mongoose = require("mongoose");
const OrganizerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    events:[{
        type:mongoose.Types.ObjectId,
        ref:Event,
    }],
    // members:[{
    //     type:mongoose.Types.ObjectId,
    //     ref:Member,
    // }],


})
module.exports = mongoose.model('/Organizer',OrganizerSchema);