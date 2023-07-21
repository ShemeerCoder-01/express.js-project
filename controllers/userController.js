const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//@desc POST register user
//@route POST /api/users/register
//@ access public
const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    console.log(username,email,password);
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }else{
        const userAvailable = await User.findOne({email});
        if(userAvailable){
            res.status(400);
            throw new Error("Email already taken");
        }else{
            const HashedPassword = await bcrypt.hash(password,10);
            console.log("Hashed password",HashedPassword);
            const user = await User.create({
                username,
                email,
                password:HashedPassword
            });
            if(user){
            res.status(201).json({__id:user.id,email:user.email});
            }else{
                res.status(400);
                throw new Error("User data is not valid");
            }
        }
    }
});

//@desc POST login user
//@route POST /api/users/login
//@ access public
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }else{
        const user = await User.findOne({email});
        if(user && bcrypt.compare(password,user.password)){
            const accessToken = await jwt.sign({
                user:{
                username:user.username,
                email:user.email,
                id:user.id
                },
            },process.env.SECRET_ACCESS_TOKEN,{expiresIn:"15m"});
            res.status(200).json({accessToken});

        }else{
            res.status(400);
            throw new Error("Username or Password is invalid!")
        }
    }
    
});

//@desc GET current user
//@route GET /api/users/current
//@ access private
const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);

});

module.exports = {registerUser,loginUser,currentUser};