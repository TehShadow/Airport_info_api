const mongoose = require("mongoose")
const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

exports.user_signup = async (req,res,next) =>{
    const tryUser = await User.find({email:req.body.email})
    if(tryUser.length != 0){
        res.status(409).json("Invalid input")
    }else{
        bcrypt.hash(req.body.password,10, (err,hash)=>{
            if(err){
                res.status(500).json({
                    error:err
                })
            }else{
                const user = new User({
                    _id:new mongoose.Types.ObjectId(),
                    email:req.body.email,
                    password:hash
                })
                try {
                    user.save();
                    res.status(200).json({
                        message:"User created"
                    })
                }
                catch(err) {
                    console.log(err);
                    res.status(500).json({
                      error: err
                    })
                }
            }
        })
    }
}

exports.user_login = async (req,res,next) => {
    try{
        const tryUser = await User.find({email:req.body.email})
    if (tryUser.length == 0){
        return res.status(401).json({
            message:"Auth failed"
        })
    }
        const user = await User.findOne({email:req.body.email})
        bcrypt.compare(req.body.password , user.password , (err,result)=>{
            if(err){
                return res.status(405).json({
                    message:"Auth failed"
                })
            }
            if(result){
                const token = jwt.sign({
                    email: user.email,
                    userId : user._id
                }, 
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn:"1h"
                })
                return res.status(200).json({
                    message:"Auth successful",
                    token:token
                })
            }
        })
    }
    catch(err){
       console.log(err)
       res.status(500).json({
           error:err
       }) 
    }
}    

exports.user_delete = async(req,res,next) =>{
    if(!User.find({_id:req.params.user_id})){
        return res.status(500).json({
            error:"User not found"
        })
    }
    else{
        User.remove({_id:req.params.user_id})
            return res.status(200).json({
                message:"User deleted"
            })
        }
    }


