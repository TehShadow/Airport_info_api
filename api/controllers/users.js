const mongoose = require("mongoose")
const User = require("../models/airport")
const bcrypt = require('bcrypt')

exports.user_signup = async (req,res,next) =>{
    if( !await User.find({email:req.body.email})){
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
                try {await user.save();}
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
    if (! await User.find({email:req.body.email})){
        return res.status(401).json({
            message:"Auth failed"
        })
    }
        const user = User.find({email:req.body.email})
        bcrypt.compare(req.body.password , user.password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:"Auth failed"
                })
            }
            if(result){
                return res.status(200).json({
                    message:"Auth successful",
                    toke:user._id
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


