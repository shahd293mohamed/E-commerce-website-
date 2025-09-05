const jwt= require("jsonwebtoken");
const User= require("../models/user.model");

exports.authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if( !authHeader ||!authHeader.startsWith("Bearer ")){
        res.status(401).json({message:"unauthorized"});
    }
    const token=authHeader.split(" ")[1];
    try{
        const decode=jwt.verify(token, process.env.JWT_KEY); 
        const user = await User.findById(decode.id).select("-password");
        console.log(user);
        req.user=user;
        next();//it's so important 
    }
    catch(err){
        res.status(403).json({message:"invalid token or expired"});
    }
    console.log(authHeader);
    
}