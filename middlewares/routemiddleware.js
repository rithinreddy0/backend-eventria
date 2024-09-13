const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();
exports.isorganizer = async (req,res,next)=>{
    try {
        
        // console.log(req.body)
        const authHeader = req.body.headers['Authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    //    console.log(req)
        // console.log(req.cookies)
        if(!token){
            // console.log("no token")
            return res.status(403).json({
                message:"no token found"
            })
        }
        const organizer = await jwt.verify(token,process.env.JWT_SECRET);
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
        const authHeader = req.body.headers['Authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(!token){
            console.log("token not found")
            return res.status(501).json({
                message:"token not found"
            })
        }
        const hod = await jwt.verify(token,process.env.JWT_SECRET)
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
        // console.log("called b")
        console.log(req.body)
        const authHeader = req.body.headers['Authorization'];
        console.log(authHeader)
        const token = authHeader && authHeader.split(' ')[1];
        if(!token){
           console.log("no token")
            return res.status(401).json({
                message:"no token found"
            })
        }
        console.log(token)
        const student = await jwt.verify(token,process.env.JWT_SECRET);
        if(!student){
            return res.status(400).json({
                message:"invalid token"
            })
        }
        // console.log(student)
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