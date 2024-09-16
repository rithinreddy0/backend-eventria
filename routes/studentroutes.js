const { Router } = require('express');
const { Slogin, SSignup, allEvents, getinfo } = require('../controllers/studentauth');
const { getallevets } = require('../controllers/Createevent');
const { isStudent } = require('../middlewares/routemiddleware');
const {eventapply, applyupdate} = require("../controllers/applyevent");
const { getregesterd } = require('../controllers/eventdetails');
const { createpermission } = require('../controllers/permission/permission');
const { allappliedevents } = require('../controllers/student/appliedevents');
const studentRouter = Router();
studentRouter.post("/login",Slogin);
studentRouter.post("/signup",SSignup);
studentRouter.post("/events",isStudent,allEvents);
studentRouter.post("/info",isStudent,getinfo)
studentRouter.post("/apply/:eventId",eventapply)
studentRouter.post("/regesterd",isStudent,getregesterd)
studentRouter.post("/update/:eventId",isStudent,applyupdate)
studentRouter.post("/newletter",createpermission)
studentRouter.post("/appliedevents",isStudent,allappliedevents)
studentRouter.post("/verify",isStudent,(req,res)=>{
    res.status(200).json({
        messaage:"success"
    })
})
module.exports={studentRouter}