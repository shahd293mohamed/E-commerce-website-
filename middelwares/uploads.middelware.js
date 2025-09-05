const multer= require("multer");
const path = require("path");

const fileFilter=(req, file, cb)=>{
    const ext = path.extname(file.originalname).toLowerCase();
    //add mime in the future for security 
    //file-type 
    const allowed=['.jpg', '.jpeg', '.png', '.webp'];
    if(!allowed.includes(ext)){
       return cb(new Error("only images are allowed (.jpg, .jpeg, .png, .webp)"), false);
    }
    cb(null, true);
}

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,'uploads')
    },
    filename: (req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const MB = 1024 * 1024;

const upload= multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * MB//2mb
    }
})


module.exports=upload;