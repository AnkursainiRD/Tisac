import { User } from "../models/userModel.js";
import {generateToken} from "../utils/tokensWorker.js"

const register=async(req,res)=>{
    try {
        const {userName,password,email}=req.body;
        if(!userName || !password || !email){
            return res.status(404).json({
                success:false,
                message:"Credentails is missing!"
            })
        }
        const existUser=await User.findOne({email:email})
        if(existUser){
            return res.status(404).json({
                success:false,
                message:"User is alreader registered!"
            })
        }

        const user=await User.create({userName,password,email})
        return res.status(200).json({
            success:true,
            message:"User created"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).message({
            success:false,
            message:"Internal server error!"
        })
    }
}


const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(404).json({
                success:false,
                message:"Credentails is missing!"
            })
        }
        const user=await User.findOne({email:email})

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User is not registered!"
            })
        }
        const validPassword=await user.passwordCheck(password)
        if(!validPassword){
            return res.status(403).json({
                success:false,
                message:"Password is invalid!"
            })
        }

        const payload={
            id:user._id,
            email:user.email,
            password:user.password
        }
        const options={
            httpOnly:true,
            secure:true
        }

        const refreshToken= generateToken(payload)
        user.refreshToken=refreshToken
        await user.save()
        
        return res.cookie("token",refreshToken,options).status(200).json({
            success:true,
            message:"User Logged In"
        })
    } catch (error) {
         console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error!"
        })
    }
}

export {register,login}