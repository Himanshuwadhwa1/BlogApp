import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {userAuth} from "../middlewares/bcrypt.js"

dotenv.config();
const router = express.Router();
const key = process.env.key;

router.post('/',userAuth,async(req,res)=>{
    const {username,password} = req.body;
    const userDoc = req.custom;
    jwt.sign({
        username,
        id:userDoc._id,
    },key,(err,token)=>{
        if(err) throw err;
        res.cookie('token', token).json({
            id: userDoc._id,
            username,
        }); //sending jwt token as a cookie
    }) //can  define an algorithm
})

export {router}