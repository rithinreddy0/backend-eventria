const {Router} = require("express");
const { createhod, loginhod } = require("../controllers/hod/newhod");
const { isHod } = require("../middlewares/routemiddleware");
const { getallletters } = require("../controllers/hod/letter");
const { onApprove, onDisapprove } = require("../controllers/hod/status");
const hodRouter = Router();
hodRouter.post("/signup",createhod);
hodRouter.post("/getallletters",isHod,getallletters);
hodRouter.post("/login",loginhod);
hodRouter.post("/approve",isHod,onApprove);
hodRouter.post("/disapprove",isHod,onDisapprove);
hodRouter.post("/verify",isHod,(req,res)=>{
    res.status(200).json({
        message:"verified"
    })
})
module.exports = {hodRouter}