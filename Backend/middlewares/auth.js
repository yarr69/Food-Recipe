import { User } from "../Models/User.js";
import jwt from 'jsonwebtoken'

export const Authenticate = async (req,res,next) => {
    const token = req.header('Auth')
    try {
        if(!token) return res.json({message : "Login First, then come again"})

        // Token ko decode kiya by passing token and secret code given in controllers
        const decode = jwt.verify(token,"!@#$%^&*()")

        // console.log(decode)
        const id = decode.userId

        let user = await User.findById(id)
 
        if(!user) return res.json({message:"User does not exists"})

        req.user = user

        next();
    } catch (error) {
        return res.status(401).json({message: error.message})
    }
}