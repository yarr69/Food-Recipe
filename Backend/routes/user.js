import express from "express"
import { login, profile, register } from "../Controller/user.js"
import { Authenticate } from "../middlewares/auth.js"


const router = express.Router()

// Registration Process 
router.post('/register', register)

// login Process
router.post('/login', login)

// profile
router.get('/profile',Authenticate, profile)

export default router