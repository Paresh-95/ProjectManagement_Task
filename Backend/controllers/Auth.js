const User = require("../models/User-model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config();



exports.signup = async(req,res)=>{
    try {
        const {name,email,password,confirmPassword} = req.body;

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User Already Exists",
            })
        }

        let hashedPassword;
        try{
            hashedPassword = await bcryptjs.hash(password,10)
        }
        catch(err){
            return res.status(400).json({
                success:false,
                message:"Error while Hashing Password",
            })
        }

        const user = await User.create({
            name,email,password:hashedPassword
        })

        return res.status(200).json({
            success:true,
            message:"User Created Successfully",
            data:user
        })

    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error cannot register User",
            error:error.message
        })
    }
}


exports.login = async (req,res) =>{
    try {

        const {email,password} = req.body;

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No user with Email found plz Register first"
            })
        }
        

        const payload = {
            email:user.email,
            id:user._id,
        }

        if(await bcryptjs.compare(password,user.password)){

            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"4h"})

            user = user.toObject();
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
                secure:true,
                sameSite:'None'
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User Logged in Successfully"
            })


        }
        else{
            return res.status(403).json({
                success:false,
                message:"Password incorrect"
            })
        }


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, Something went wrong while Logging In",
            error:error.message
        })
        
    }
}


exports.logout = (req,res) =>{
    try {
        //clear the cookie containing the jwt token
        res.clearCookie("token",{
        });

        return res.status(200).json({
            success:true,
            message:"User Logged Out Successfully"
        })


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error Something went wrong while Logging out",
            error:error.message
        })
        
    }
}