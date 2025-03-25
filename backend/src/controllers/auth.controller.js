import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup =   async(req, res) => {
    const {fullName , email , password} = req.body;
  try {
    if(!fullName || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    if(password.length < 6){
        return res.status(400).json({message:"Password must be atleast 6 characters long"});
    }
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message:"User already exists"});
    }
    const salt= await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password , salt);

    const newUser = new User({fullName , email ,password: hashedPassword});

    if(newUser){
        generateToken(newUser._id , res);
        await newUser.save();
        return res.status(201).json({message:"User created successfully", id:newUser._id , fullName:newUser.fullName , email:newUser.email , profilePic:newUser.profilePic});
    }
    else{
        return res.status(400).json({message:"Invalid user data"});
    }

  } catch (error) {
    console.log("Error in Signup Controller", error.message);
    return res.status(500).json({message:"Internal Server Error in Signup Controller"});
    
  }
}

export const login = async  (req, res) => {
  const {email , password} = req.body;  
  try {
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid Credentials"});
    }
   const isPasswordCorrect = await bcrypt.compare(password , user.password );
   if(!isPasswordCorrect){
    return res.status(400).json({message:"Invalid Credentials"});
   }
   generateToken(user._id , res);
    return res.status(200).json({message:"Login Successful", id:user._id , fullName:user.fullName , email:user.email , profilePic:user.profilePic});

  } catch (error) {
    console.log("Error in login Controller",error.message);
    res.status(500).json({message:"Internal Server Error in Login Controller"});
    
  }
}

export const logout = (req, res) => {
    try {
        res.cookie("token" , "" , {maxAge:0});
        return res.status(200).json({message:"Logout Successful"});
    } catch (error) {
        console.log("Error in Logout Controller",error.message);
        return res.status(500).json({message:"Internal Server Error in Logout Controller"});
    }
}

export const updateProfile = async (req, res) => {



  
}