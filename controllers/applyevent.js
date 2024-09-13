const Event = require("../Models/Event");
const Student = require("../Models/Student");
const bcrypt = require('bcrypt')
const Token = require("../Models/Token");;
const express = require('express');
const CryptoJS = require('crypto-js');
require('dotenv').config();
exports.eventapply = async (req,res)=>{
    try{
        // console.log("object")
        const eventId = req.params.eventId;
        const event = await Event.findById({_id:eventId});
        res.status(200).json({
            data:event,
            message:"success"
        })
    }catch(error){
        res.status(400).json({
            error:error.message
        })
    }
}
exports.applyupdate = async(req,res)=>{
    
    try{
        const eventId = req.params.eventId;
        const student = req.student;
        const data = {
            studentId:student.id,
            eventId:eventId
        }
        
        const check = await Token.findOne({studentId:student.id,eventId});
        console.log(check)
        if(check){
            return res.status(303).json({
                message:"already applied"
                })
        }
        const tokenString = JSON.stringify(data);
        const token = CryptoJS.AES.encrypt(tokenString, process.env.JWT_SECRET).toString();
        const student1 = await Student.findByIdAndUpdate(
            {_id:student.id} ,
            { $push: { enrolled_events: eventId } },
            { new: true } 
          );
        const event = await Event.findByIdAndUpdate({_id:eventId},{$push:{students_enrolled:student.id}})
        const newtoken = await Token.create({studentId:student.id,eventId,token});
        const alltokens = await Token.find({});
        if(!student1){
            return res.status(400).json({
                message:"error"
            })
        }
        res.status(200).json(
            {
                message:"Updated in db",
                data:alltokens
            }
        )
    }catch(er){
        console.log(er)
        res.status(402).json({
            message:er.message
        })
    }
}