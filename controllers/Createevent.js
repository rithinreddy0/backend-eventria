const Event = require("../Models/Event");
const Organizer = require('../Models/Organizer')
exports.createEvent = async (req,res)=>{
    try{
        const {name,description,date,stime,etime,formcode} = req.body;
        const organizer = req.organizer;
        
        if(!name||!description||!date||!stime||!etime||!organizer){
            console.log("incom")
            return( res.json(400).json({
                message:"Incomplete data"
            }))
        }
        else{
            // console.log(organizer)
            const newevent = await Event.create({formcode,  name,description,date,stime,etime,created_by:organizer.id});
            const user =await  Organizer.findOneAndUpdate({_id:organizer.id},{$push:{events:newevent}})
            // console.log(user)
           // console.log("Success")
            res.status(201).json({
            message:"new event created"
        })
        }
    }catch(error){
        console.log(error)
        res.status(500).send({message: "Internal Server Error",error:error.message});
    }
}
exports.getallevets= async (req,res)=>{
    try{
        const organizer = req.organizer;
        const user = await Organizer.find({_id:organizer.id});
        const data = await Event.find({created_by:organizer.id});
 
        return res.status(200).json({
            name:user[0].name,
            data:data,
        })
    }catch(error){
        console.log(error.message)
        res.status(600).json({message:error.message})
    }
}