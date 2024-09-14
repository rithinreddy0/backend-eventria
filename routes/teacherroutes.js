const {Router} = require("express");
const { Tlogin, TSignup } = require("../controllers/teacher/tauth");
const { getStudents } = require("../controllers/teacher/getstudents");
const { isTeacher } = require("../middlewares/routemiddleware");
const teacherRouter = Router();
teacherRouter.post('/login',Tlogin);
teacherRouter.post('/signup',TSignup)
teacherRouter.post("/getstudents",getStudents);
teacherRouter.post("/verify",isTeacher,(req,res)=>{
    res.status(200).json({
        message:"You are a teacher"
    })
})
module.exports = teacherRouter;