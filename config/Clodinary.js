const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const multer = require('multer');

exports.cloudinaryConnect = () => {
try{
        cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        })
        const storage = multer.diskStorage({
            filename: (req, file, cb) => {
                  cb(null, Date.now() + path.extname(file.originalname)); // Save with timestamp and original extension
            },
        });
              
        const upload = multer({ storage });
      
}
catch(error) {
        console.log(error);
}
}