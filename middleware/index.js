import jwt from "jsonwebtoken";
import User from "../models/User.js";

const { ACCESS_TOKEN_SECRET } = process.env;

export const verifyAccessToken = async (req, res, next) => {
    const token = req.header("Authorization")
    if(!token){
        return res.status(400).json({msg: "Token not found"})
    }
    let user;
    try {
        user = jwt.verify(token, ACCESS_TOKEN_SECRET)
    } catch (error) {
        return res.status(401).json({msg: "Invalid token"})        
    }

    try {
        user = await User.findById(user.id)
        if(!user){
            return res.status(401).json({msg: "User not found"})
        }
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}