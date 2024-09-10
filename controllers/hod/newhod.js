const Hod = require("../../Models/Hod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
exports.createhod = async(req,res)=>{
    try{
        const {name,email,password,department} = req.body;
        if(!name||!email||!password||!department){
            return res.status(500).json({
                message:"Data missing"
            }
            )
        }
        
        const hashedpassword = await bcrypt.hash(password,10)
    
        const newhod = await Hod.create({name,email,password:hashedpassword,department});
        res.status(200).json({
            message:"Hod created successfully"
        })
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}
exports.loginhod = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email||!password){
            return res.status(500).json({
                message:"Data missing"
            }
            )
        }
        const hod = await Hod.findOne({email});
        if(!hod){
            return res.status(404).json({
                message:"user hod not found"
            })
        }
        console.log(password,hod);
        // console.log(email,password,hod)
        const ismatch = await bcrypt.compare(password,hod.password);

        if(!ismatch){
            return res.status(500).json({
                message:"Incorrect password"
            })
        }
        const payload = {
            id:hod._id,
            name:hod.name,
            email:hod.email,
            department:hod.department
        }
        const token = await jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
        });
        hod.token = token;
        hod.password = undefined;
        const options={
            httpOnly:true,
            expires:new Date(Date.now()+ 2*60*60*1000)
        }
        res.cookie('hodAuthToken',token,options).status(200).json({
            message:"successfull",
            data:hod,
            token:token
        })

    }catch(error){
        console.log(error)
        res.status(400).json({
            message:error.message
        })
    }
}