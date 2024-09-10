const Event = require("../Models/Event");
const Student = require("../Models/Student");

exports.fullevent = async (req,res)=>{
    try{
        console.log("Called")
        const { eventId } = req.params;
        const event = await Event.find({_id:eventId});
        if(!event){
            return res.status(401).json({
                message:"invalid event"
            })
        }
        console.log(eventId)
        res.status(200).json({
            message:"event found",
            data:event,
        })
        
    }catch(error){
        console.log(error.message)
        return res.status(400).json({
            
            message: error.message
        })
    }

}
exports.getregesterd = async(req,res)=>{
    try{
        
        const student = req.student;
        const event = await Student.findById({_id:student.id});
        if(!event){
            return res.status(402).json({
                message:"error message",
            })
        }
       if(event.enorlled_events){
        const data = event.enorlled_events;
        res.status(200).json({
            data:data,
            message:"Success"
        })
       }
       else{
        res.status(400).json({
            message:"No events"
        })
       }
        
    }catch(error){
        res.status(400).json({
            messsage:error.message
        })
    }
}