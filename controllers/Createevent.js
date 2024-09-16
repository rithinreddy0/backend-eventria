const Event = require("../Models/Event");
const Organizer = require('../Models/Organizer')
exports.createEvent = async (req,res)=>{
    try{
        // console.log(req)
        const {name,description,date,stime,etime,formcode,id} = req.body;
        // console.log(req.files)
        // console.log(image)
        // const organizer = req.organizer;
        // console.log(id)
        if(!name||!description||!date||!stime||!etime||!id){
            console.log({name,description,date,stime,etime,formcode,id});
            return( res.status(400).json({
                message:"Incomplete data"
            }))
        }
        else{
            // console.log(organizer)
            const newevent = await Event.create({formcode,  name,description,date,stime,etime,created_by:id});
            const user =await  Organizer.findOneAndUpdate({_id:id},{$push:{events:newevent}})
            // console.log(user)
           // console.log("Success")
            res.status(201).json({
            message:"new event created"
        })
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Internal Server Error",error:error.message});
    }
}
exports.getallevets= async (req,res)=>{
    try{
        const organizer = req.organizer;
        const user = await Organizer.find({_id:organizer.id});
        const data = await Event.find({created_by:organizer.id});
 
        return res.status(200).json({
            id:user[0]._id,
            name:user[0].name,
            data:data,
        })
    }catch(error){
        console.log(error.message)
        res.status(600).json({message:error.message})
    }
}