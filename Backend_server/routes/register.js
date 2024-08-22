import express from "express";
import dotenv from "dotenv";
import {userSign} from "../middlewares/bcrypt.js"
import {userModel} from "../db/db.js"


dotenv.config();
const registerRouter = express.Router();
const key = process.env.key;


registerRouter.post('/',userSign,async(req,res)=>{
    const {username} = req.body;
    const hashed = req.pass;
    try{
        const userData =await userModel.create({
            username,
            password:hashed,
        })
        res.json(userData);
    }catch(err){
        res.status(400).json({msg:"something wrong"});
    }
})

export {registerRouter};