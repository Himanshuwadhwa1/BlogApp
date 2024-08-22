import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";
import { userModel } from "../db/db.js";
const salt = bcrypt.genSaltSync(10);

async function userAuth(req,res,next){
    const {username,password} = req.body;
    const userDoc = await userModel.findOne({username});
    if(userDoc){
        const passOk = bcrypt.compareSync(password,userDoc.password);
        if(passOk){
            req.custom = userDoc;
            next();
        }else{
            res.status(400).json({msg:"wrong username or password"});
        }
    }else{
        res.status(400).json({msg:"wrong username or password"});
    }
}

async function userSign(req,res,next){
    const {username,password} = req.body;
    const hashed = bcrypt.hashSync(password,salt);
    req.pass = hashed;
    next();
}

export {userAuth, userSign};