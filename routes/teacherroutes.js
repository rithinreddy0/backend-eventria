const {Router} = require("express");
const { Tlogin, TSignup } = require("../controllers/teacher/tauth");
const { getStudents } = require("../controllers/teacher/getstudents");
const teacherRouter = Router();
teacherRouter.post('/login',Tlogin);
teacherRouter.post('/signup',TSignup)
teacherRouter.post("/getstudents",getStudents);
module.exports = teacherRouter;