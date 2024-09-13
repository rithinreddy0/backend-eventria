const Student = require("../Models/Student");
const Event = require("../Models/Event")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.SSignup = async(req,res)=>{
    try{
        const {name,email,password,rollno,className,year,section} = req.body;
        const user = await Student.findOne({email});
        if(user){
            return res.status(400).json({
                message:"USer already exists"
            })
        }
        const hasedpassword = await bcrypt.hash(password,10);
        const user1 = await Student.create({name,email,password:hasedpassword,className,section,rollno,year});
        res.status(201).json({
            message:"User created successfully"
            })
    }
    catch(error){
        res.status(500).json({message:error.message})

    }
}
//login
exports.Slogin = async (req,res) => {
    try {
    //data fetch
        const {rollno, password} = req.body;
        console.log(rollno,password);
    //validation on email and password
         if(!rollno || !password) {
             return res.status(400).json({
                 success:false,
                message:'PLease fill all the details carefully',
            });
        }
    //check for registered user
        let user = await Student.findOne({rollno});
    //if not a registered user
        if(!user) {
            return res.status(401).json({success:false,
            message:'User is not registered',
        });
        }
        const payload = {
            email:user.email,
            id:user._id,
            rollno:user.rollno,
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
            httpOnly:false,
            sameSite:'none',
            secure:true,
            maxAge:259200000,
        
        }
        res.cookie("studentAuthToken", token, options).status(200).json({
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
            
exports.allEvents = async (req,res)=>{
    try{
        
        const events = await Event.find({});
        if(!events){
            return res.status(401).json({
                message:"error"
            })
        }
        res.status(200).json({
            message:"events found",
            data:events,
        })
        
    }catch(error){
        console.log(error.message)
        return res.status(400).json({
            
            message: error.message
        })
    }

}
exports.getinfo = async (req,res)=>{
    try{
        // console.log("called aa")
        const student = req.student;
        // console.log(student)
        const studentInfo = await Student.findById(student.id);
        // console.log(studentInfo)
        if(!studentInfo){
            return res.status(402).json({
                message:"no account found"
            })
        }
        res.status(200).json({
            message:"student info found",
            data:studentInfo
        })

    }catch(error){
        return res.status(400).json({
            message:"error",
            error:error.message
        }
        )
    }
}