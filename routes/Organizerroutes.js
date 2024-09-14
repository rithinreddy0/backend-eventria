const { Router } = require('express');
const { OSignup, Ologin } = require('../controllers/OrganizerC');
const { createEvent, getallevets } = require('../controllers/Createevent');
const { isorganizer } = require('../middlewares/routemiddleware');

const { oevent } = require('../controllers/organizer/oevent');
const { validate } = require('../controllers/organizer/validate');
const organizerRouter = Router();
organizerRouter.post('/signup',OSignup)
organizerRouter.post('/login',Ologin)
organizerRouter.post("/createevent",createEvent);
organizerRouter.post("/getallevents",isorganizer,getallevets)
organizerRouter.post("/event/:eventId",isorganizer,oevent);
organizerRouter.post("/validate",validate)

organizerRouter.post("/verify",isorganizer,(req,res)=>{
  res.status(200).json({
    message:"Success" 
  })
})
module.exports = {
    organizerRouter,
  };