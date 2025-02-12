import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken'

const updateRefreshToken=async()=>{
   try {
     const users=await User.find({});
     
     for(let user of users){
         const updatedToken=generateToken(user)
         user.refreshToken=updatedToken
         await user.save()
     }
     console.log("Token Updated")
   } catch (error) {
        console.log(error)
        throw error;
   }
}

const generateToken=(payload)=>{
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
} 

export {updateRefreshToken,generateToken}