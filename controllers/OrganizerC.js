const Organizer = require("../Models/Organizer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.OSignup = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await Organizer.findOne({email});
        if(user){
            return res.status(400).json({
                message:"USer already exists"
            })
        }
        const hasedpassword = await bcrypt.hash(password,10);
        const user1 = await Organizer.create({name,email,password:hasedpassword});
        res.status(201).json({
            message:"User created successfully"
            })
    }
    catch(error){
        res.status(500).json({message:error.message})

    }
}
//login
exports.Ologin = async (req,res) => {
    try {
    //data fetch
        const {email, password} = req.body;
    //validation on email and password
         if(!email || !password) {
             return res.status(400).json({
                 success:false,
                message:'PLease fill all the details carefully',
            });
        }
    //check for registered user
        let user = await Organizer.findOne({email});
    //if not a registered user
        if(!user) {
            return res.status(401).json({success:false,
            message:'User is not registered',
        });
        }
        const payload = {
            email:user.email,
            id:user._id,
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
        // expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Expires in 3 days
        httpOnly: true,  // Prevents client-side JS from accessing the cookie
        secure: true,    // Ensures cookie is sent only over HTTPS (required for SameSite=None)
        sameSite: 'None'
        
        }
        res.cookie("organizerAuthToken", token, {
            httpOnly:false,
            sameSite:'none',
            secure:true,
            maxAge:259200000,
        }).status(201).json({
                success:true,
                token,
                
                user,
                message:'User Logged in successfully',
            });
        }
        else {
        //passwsord do not match
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
            