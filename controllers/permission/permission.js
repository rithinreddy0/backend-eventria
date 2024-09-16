const Permission = require("../../Models/Permission");
const Student = require("../../Models/Student");

exports.createpermission = async (req,res)=>{
    try{
        const {subject,body,members,department} = req.body;
        if(!department){
            console.log(subject,body,department)
            return res.status(500).json({
                
                message:"data missing "
            })
        }
        // const student1 = req.student;
        // console.log(student1.id)
        let permission = await Permission.create({subject,body,department,});
        if(members){
            members.map(async(data)=>{
                const student = await Student.findOne({name:data});
                permission = await Permission.findByIdAndUpdate({_id:permission._id},{$push:{members:student._id}});
            })
        }
        res.status(200).json({
            message:"Successfully created",
            data:permission
        })
        

    }catch(error){
        console.log(error.message)
        res.status(500).json({
            message: error.message

        })
    }
}