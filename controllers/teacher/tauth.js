const Student = require("../../Models/Student");
const Event = require("../../Models/Event")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Teacher = require("../../Models/Teacher");

exports.TSignup = async(req,res)=>{
    try{
        const {name,email,password,staffno} = req.body;
        const user = await Teacher.findOne({email});
        if(user){
            return res.status(400).json({
                message:"USer already exists"
            })
        }
        const hasedpassword = await bcrypt.hash(password,10);
        const user1 = await Teacher.create({name,email,password:hasedpassword,staffno});
        res.status(201).json({
            message:"User created successfully"
            })
    }
    catch(error){
        res.status(500).json({message:error.message})

    }
}
//login
exports.Tlogin = async (req,res) => {
    try {
    //data fetch
        const {staffno, password} = req.body;
    //validation on email and password
         if(!staffno || !password) {
             return res.status(400).json({
                 success:false,
                message:'PLease fill all the details carefully',
            });
        }
    //check for registered user
        let user = await Teacher.findOne({staffno});
    //if not a registered user
        if(!user) {
            return res.status(401).json({success:false,
            message:'User is not registered',
        });
        }
        const payload = {
            email:user.email,
            id:user._id,
            staffno:user.staffno,
            name:user.name
        };
        //verify password & generate a JWT token
        if(await bcrypt.compare(password,user.password) ) {
        //password match
        
            let token = jwt.sign(payload,
            process.env.JWT_SECRET,
            {
            expiresIn:"2h",
        });
        user = user.toObject();
        user.token = token;
        user.password = undefined;
        const options = {
        expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        
        }
        res.cookie("cookie", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'User Logged in successfully',
            });
        }
        else {
        
            return res.status(403).json({
                    success:false,
                    message:"Password Incorrect",
        });
        }
        }
        catch(error) {
            console.log(error);return res.status(500).json({
                 success:false,
                message:'Login Failure',
            });
        }
}
// exports.isTeacher = async (req,res)=>{
//     try{
//         const 
//     }catch(eror){
//         res.status(500).json{
//             message:eror.message
//         }
//     }
// }