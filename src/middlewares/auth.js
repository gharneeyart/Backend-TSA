import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const isLoggedIn = async(req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({success: false, message:"Invalid token or No token provided"})
    }

    // Extract the token 
    const token = authHeader.split(" ")[1]; // split helps split the token from where there is space.. it then returns the token in array format.. this [1] select the token

    // verify the token
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
            if(err){
                return res.status(403).json({success: false, message:"Invalid token"})
            } else {
                req.user = decoded;
                console.log({decoded});
                next();
            } 
        })
    } else{
        res.status(401).json({success: false, message:"You are not authorized"})
    }
}

export const isAdmin = async(req, res, next)=>{
    try {
        const userId = req.user._id
        const user = await User.findById({_id: userId})

        if(!user){
            return res.status(404).json({success: false, message: "User not found"})
        }
        if(user.role === 1){
            next(); 
        } else {
            return res.status(401).json({success: false, message: " Unauthorized user"})
        }
          
    } 
        catch (err) {
        console.log(err);
        res.join({success: false, message: "Error checking admin"})
    }
}