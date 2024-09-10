const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();
exports.isorganizer = async (req,res,next)=>{
    try {
        const {organizerAuthToken} = req.cookies;
        // console.log(req)
        if(!organizerAuthToken){
            // console.log("no token")
            return res.status(401).json({
                message:"no token found"
            })
        }
        const organizer = await jwt.verify(organizerAuthToken,process.env.JWT_SECRET);
        if(!organizer){
            return res.status(402).json({
                message:"invalid token"
            })
        }
        req.organizer = organizer;
        next();

    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message: "Internal Server Error",error:error.message});
    }
}
exports.isHod = async (req,res,next)=>{
    try{
        const {hodAuthToken} = req.cookies;
        if(!hodAuthToken){
            console.log("token not found")
            return res.status(501).json({
                message:"token not found"
            })
        }
        const hod = await jwt.verify(hodAuthToken,process.env.JWT_SECRET)
        if(!hod){
            return res.status(402).json({
                message:"invalid token"
            })
        }
        req.hod = hod;
        next();
    }catch(error){
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}
exports.isStudent = async(req,res,next)=>{
    try {
        const {studentAuthToken} = req.cookies;
        // console.log(studentAuthToken)
        if(!studentAuthToken){
           
            return res.status(401).json({
                message:"no token found"
            })
        }
        const student = await jwt.verify(studentAuthToken,process.env.JWT_SECRET);
        if(!student){
            return res.status(400).json({
                message:"invalid token"
            })
        }
        // console.log(student)
        req.student = student;
        next();
    }catch(error){
        console.log(error)
        res.status(402).json({
            message:"internal server error",
            error:error.message
        })
    }
}