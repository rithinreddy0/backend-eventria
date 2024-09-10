const Token = require("../../Models/Token");

exports.allappliedevents = async (req,res)=>{
    try{
        console.log("called")
        const studentId=req.student.id;
        console.log(studentId)
        if(!studentId){
            return res.status(501).json({
                message:"incomplete data"
            })
        }
        console.log("Called")
        const events = await Token.find({studentId}).populate('eventId');
        res.status(200).json({
            message:"events fetched successfully",
            data:events
            })

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}