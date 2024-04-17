// import { response } from express;
import User from '../models/user.js';
import { hashPassword, comparePassword } from '../helpers/auth.js';
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv'
// aids the upload of the image
import { cloudinary } from '../helpers/cloudinary.config.js';
import { response } from 'express';
dotenv.config()


// creating registration function
export const signUp = async (req, res) => {
    try {
        // handle request fields (req.body)
        // then destructure the fields required for registration
        const { name, email, password } = req.body;
        // to request things not required typing, u need it dynamically, you use useParam?
        // for image fields, you need to use req.file
        const image = req.file

        // Field Validation
        if(!name) {
            return res.status(400).json({success:false, message: "Name is required"});
        }
        if(!email) {
            return res.status(400).json({success:false, message: "Email is required"});
        }
        if(!password) {
            return res.status(400).json({success:false, message: "Password is required"});
        }

        // check if email is taken
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({success:false, message: "Email is taken"});
        }

        // hash password
        const hashed = await hashPassword(password);

        // create a new user object :
        const user = new User({
            name,
            email,
            password: hashed,
           
        });

        // handle image upload
        if(image){
           try {
            const imagePath = await cloudinary.uploader.upload(image.path);
            user.image = imagePath.secure_url;
            user.imagePublicId = imagePath.public_id;
           } catch (err) {
            console.log(err);
            return res.json({success: false, message: "Error uploading image", err})
           }
        }
        // save the new user to the database
        await user.save();

        // create a token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: 86400
        });
        return res.json({success: true, data: user, token});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}


// const login = (req,res) => {
//     res.send({message: "Login successful", user: { _id: 123, email: 'shuaibganiyat20@gmail.com'}})
// };

// creating registration function
export const login = async (req, res) => {
    try {
        // handle request fields (req.body)
        // then destructure the fields required for registration
        const { email, password } = req.body;
        // to request things not required typing, u need it dynamically, you use useParam?
        // for image fields, you need to use req.file

        // Field Validation
        if(!email) {
            return res.status(400).json({success:false, message: "Email is required"});
        }
        if(!password) {
            return res.status(400).json({success:false, message: "Password is required"});
        }

        // check if user already exists
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({success:false, message: "User not found"});
        }

        // hash password
        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(400).json({success:false, message: "Incorrect password"});
        }

        // create a token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: 86400
        });

        return res.json({success: true, message: "Login Successful" ,data: user , token});
    } catch (err) {
        console.log("Error creating registration", err.message);
        return res.status(500).json({message: "Registration failed", err});
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email) {
            return res.status(400).json({success:false, message: "Email is required"});
        }

        // find user by email
        const user = await User.findOne({email});
        if (!user){
            return res.status(404).json({success:false, message: "User not found"});
        }

        // OTP and send to user

        // Generate password reset token
        const resetToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        // send reset token to user's email address
        const domain = "www.blard.com"
        const resetLink = `${domain}/reset/${resetToken}`

        // send response including the reset token
        return res.json({message: "Password reset token generated successfully", resetToken})
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Password reset token failed"});
    }
};

// resetPassword function
export const resetPassword = async(req, res) => {
    try {
      const { newPassword } = req.body;
  
      const resetToken = req.headers.authorization
  
      if(!newPassword){
        return res.status(400).json({success: false, message: 'Enter new password'})
      }
      if(!resetToken || !resetToken.startsWith("Bearer")){
        return res.status(401).json({success: false, message: 'invalid token or no reset token provided'}) 
      }
  
      //get token without the "Bearer"
      const token = resetToken.split(" ")[1]
      // console.log(token);
  
      // verify the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
      // console.log(decodedToken);
  
      if(!decodedToken){
        return res.status(403).json({success: false, message: "Invalid/expired token provided"})
      }
      const userId = decodedToken.userId
      // console.log(userId);
  
      //find user by userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ error: "Invalid user" });
      }
  
      const hashedPassword = await hashPassword(newPassword);
  
      user.password = hashedPassword;
  
      // save user (including the new password)
      await user.save();
  
      res.json({success: true, message: "Password reset successfully" });
  
      
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({success: false, message: "Password reset failed", error: err.message});
      
    }
  }