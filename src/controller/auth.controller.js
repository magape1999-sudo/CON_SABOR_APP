import User from "../models/User.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"

export const register = async (req,res)=>{

try{

const {username,email,password} = req.body

const salt = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password,salt)

const user = new User({

username,
email,
password:hash

})

await user.save()

res.json({msg:"Usuario creado"})

}catch(error){

res.status(500).json(error)

}

}

export const login = async (req,res)=>{

try{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){

return res.status(400).json({msg:"Usuario no encontrado"})

}

const valid = await bcrypt.compare(password,user.password)

if(!valid){

return res.status(400).json({msg:"Password incorrecto"})

}

const token = generateToken(user._id)

res.json({token})

}catch(error){

res.status(500).json(error)

}

}