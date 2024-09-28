const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const Student = require('../../Models/Student');
const Teacher = require('../../Models/Teacher');
const Hod = require('../../Models/Hod');
const Organizer = require('../../Models/Organizer');
require('dotenv').config();
// Utility function to get the model based on the role
const getUserModel = (role) => {
    switch (role) {
        case 'student':
            return Student;
        case 'teacher':
            return Teacher;
        case 'hod':
            return Hod;
        case 'organizer':
            return Organizer;
        default:
            throw new Error('Invalid role');
    }
};

// Send Reset Password Email
exports.forgotPassword = async (req, res) => {
    console.log("called")
    const { email, role } = req.body;

    let UserModel;
    try {
        UserModel = getUserModel(role);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }

    // Find the user by email
    // console.log(UserModel)

    const user = await UserModel.findOne({ email });
  
    if (!user) return res.status(400).json({ message: "User not found" });

    // Generate reset token
    const payload = {
        user: user._id,
        role: role,
        email
    }
   
        const options = {
            expiresIn: '1h' // Token will expire in 5 minutes
          };
          
    
    const resetToken = await  jwt.sign(payload,process.env.JWT_SECRET,options)
    // Send reset link via email
    const resetUrl = `${process.env.FURL}/resetpassword/${role}/${resetToken}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Password Reset Request',
        text: `You are receiving this because you (or someone else) have requested the reset of the password. Please click on the following link, or paste this into your browser to complete the process: ${resetUrl}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent' });
        console.log("sent")
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        console.log(err.message)
        res.status(500).json({ message: 'Email could not be sent' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try{
        const { password ,role} = req.body;

    let UserModel;
    try {
        UserModel = getUserModel(role);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }

    // Hash the token
    console.log(req.params.token)
    // console.log(process.env.JWT_SECRET)
    const userdata = await jwt.verify(req.params.token , process.env.JWT_SECRET) ;
    console.log(userdata)
    if (!userdata) return res.status(400).json({ message: 'Invalid or expired token' });

    // Hash the new password and reset the fields
    const saltRounds = 10;
    const newpassword = bcrypt.hashSync(password, saltRounds);

    await UserModel.findByIdAndUpdate({_id:userdata.user},{password:newpassword})
    res.status(200).json({ message: 'Password reset successful' });
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            message:err.message
        })
    }
};
