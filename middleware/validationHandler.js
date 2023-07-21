const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1];
        if(!token){
            res.status(401);
            throw new Error("User is not authenticated or token is missing");
        }else{
        await jwt.verify(token,process.env.SECRET_ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("user is not authenticated");
            }
            req.user = decoded.user;
        });
        next();
      }
    }else{
        res.status(400);
        throw new Error("Authorization error");
    }
});

module.exports = validateToken;