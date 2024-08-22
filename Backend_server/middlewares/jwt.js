import jwt from "jsonwebtoken";
import { userModel } from "../db/db.js";
import dotenv from "dotenv";

dotenv.config();
const key = process.env.key;

async function jwtVerify(req,res,next){
    const {token} = req.cookies;
    jwt.verify(token,key,async(err,info)=>{
        if(err) throw err;
        else{
            req.info = info;
            next();
        }
    })
}


export {jwtVerify};