//importing modules
const express = require("express");
const dotenv = require('dotenv').config();
const bodyparser = require("body-parser");
const db_connect= require("./config/Dbconnect");

const { organizerRouter } = require("./routes/Organizerroutes");
const cors = require("cors");
const cp = require("cookie-parser");
const { studentRouter } = require("./routes/studentroutes");
const { cloudinaryConnect } = require("./config/Clodinary");
const { hodRouter } = require("./routes/hodroutes");
const teacherRouter = require("./routes/teacherroutes");


//constants
const port = process.env.PORT||3000


//initialiazation of server
const app = express();


//middle wares
app.use(bodyparser.json());
app.use(cors());
app.use(express.json());

app.use(cp());
// server listening
app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})

//configurations
cloudinaryConnect();
db_connect();
//routes
app.use("/organizer",organizerRouter)
app.use("/student",studentRouter)
app.use("/hod",hodRouter)
app.use("/teacher",teacherRouter)
app.get("/",(req,res)=>{
    res.send("Hello World")
})
