const bcrypt = require("bcrypt");
const express = require('express');
const CryptoJS = require('crypto-js');
const Event = require('../../Models/Event');
const Student = require("../../Models/Student");
require('dotenv').config();
exports.validate = async (req,res)=>{
    try{
        const { qrData } = req.body;
        // console.log(qrData)
        // console.log(typeof(qrData))  ;
    // Ensure qrData is a string and not undefined
    // if (!qrData || typeof qrData !== 'string') {
    //   throw new Error('Invalid data format');
    // }
    const bytes = CryptoJS.AES.decrypt(qrData, process.env.JWT_SECRET);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    // Check if decryption was successful
    if (!decrypted) {
      throw new Error('Failed to decrypt data');
    }
    const data = JSON.parse(decrypted);
    const data1 = await Event.findByIdAndUpdate({_id:data.eventId},{$push:{students_attended:data.studentId}},{new:true}).populate();
    const student = await Student.findById({_id:data.studentId});

    res.status(200).json({
      message:"updated",
      data:data1,
      student
    })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:error.message,
            
        })
    }
}