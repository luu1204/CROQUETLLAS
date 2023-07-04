const cloudinary = require("cloudinary").v2
const multer = require("multer")
const {CloudinaryStorage}= require("multer-storage-cloudinary")
cloudinary.config({

    cloud_name: process.env.CLOUD,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
const storage = new CloudinaryStorage({
    cloudinary,
    params :{
        allow_formats: ["jpj, pnj"],
        folder:"prueba"
    }
})

module.exports = multer({storage})