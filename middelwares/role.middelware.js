exports.authorize = (...allowedRoles) => {//role is admin or user
    return (req, res, next) => {//middleware function
        if(!allowedRoles.includes(req.user.role)){
            res.status(403).json({message:"access denied"});//unauthorized
        }
        next();
    }
}