const Permission = require("../../Models/Permission");

exports.getallletters = async (req,res)=>{
    try{
        const {department} = req.hod;
        console.log(req.hod)
        if(!department){
            return res.status(500).json({
                message:"department not available"
            })
        }
        const letters = await Permission.find({department},{password:0}).populate('createdBy').populate("members");
        
        return res.status(201).json({
            data:letters,
            messaage:"Successfull"
        })
    }catch(error){
        res.status(200).json({
            message:error.message
        })
    }
}