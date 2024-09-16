const Permission = require("../../Models/Permission");

exports.onApprove = async(req,res)=>{
    try{
        const id = req.body.headers['id'];
        const newpermission= await Permission.findByIdAndUpdate({_id:id},{status:"approved"});
        if(!newpermission){
            return res.status(404).json({message:"Permission not found"});
        }
        return res.status(200).json({message:"Permission approved successfully"});
    }
    catch(error){
        console.log(error.message)
        res.status(400).json({
            message:error.message
        })
    }
}
exports.onDisapprove = async(req,res)=>{
    try{
        const id = req.body.headers['id'];
        const newpermission= await Permission.findByIdAndUpdate({_id:id},{status:"disapproved"});
        if(!newpermission){
            return res.status(404).json({message:"Permission not found"});
        }
        return res.status(200).json({message:"Permission disapproved successfully"});
    }
    catch(error){
        console.log(error.message)
        res.status(400).json({
            message:error.message
        })
    }
}