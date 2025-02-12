import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        console.log("heree")
        return next()
    }
    this.password=await bcryptjs.hash(this.password,10)
})

userSchema.methods.passwordCheck=async function(password){
    return await bcryptjs.compare(password,this.password)
}

export const User=mongoose.model("User",userSchema)