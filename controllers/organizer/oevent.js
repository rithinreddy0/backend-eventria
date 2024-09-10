const Event = require("../../Models/Event");

exports.oevent = async (req,res)=>{
    try{
        const {eventId} = req.params
        const event = await Event.findById({_id:eventId}).populate('students_attended');
        if(!event) return res.status(404).json({message:"Event not found"});
        res.status(200).json({
            message:"success",
            data:event,
        })

    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}