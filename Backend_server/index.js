import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import {userModel} from "./models/user.js";
import bcrypt from "bcryptjs"; //for encrypting passwords before storing in database
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs"
import { PostModel } from "./models/Post.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const salt = bcrypt.genSaltSync(10);
const key = 'yourSecret'; //write your own secret key

mongoose.connect('your url') //add your mongo connection url
const uploadMiddle = multer({ dest: 'uploads/' })

const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser()); //to parse cookie we get from webpage as req
app.use('/uploads',express.static(__dirname+'/uploads'));


app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
    }
));

app.post('/register',async(req,res)=>{
    const username= req.body.username;
    const password = req.body.username;
    try{
        const userData =await userModel.create({
            username,
            password:bcrypt.hashSync(password,salt),
        })
        res.json(userData);
    }catch(err){
        res.status(400).json({msg:"something wrong"});
    }
})

app.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const userDoc = await userModel.findOne({username});
    const passOk = bcrypt.compareSync(password,userDoc.password);
    if(passOk){
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
    }else{
        res.status(400).json({msg:"wrong username or password"});
    }
})

app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,key,(err,info)=>{
        if(err) throw err;
        res.json(info);
    });
})


app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})

app.post('/post',uploadMiddle.single('file') ,async(req,res)=>{
    
    const {originalname , path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path + '.' + ext;
    fs.renameSync(path,newPath);

    const {token} = req.cookies;
    jwt.verify(token,key,async(err,info)=>{
        if(err) throw err;
        const {title, summary, content} = req.body;
        const postDoc = await PostModel.create({
            title,
            summary,
            content,
            cover: newPath,
            author:info.id,
        })
        res.json(postDoc);
    });
})

app.put('/post',uploadMiddle.single('file') ,async(req,res)=>{
    let newPath = null;
    if(req.file){
        const {originalname , path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length -1];
        newPath = path + '.' + ext;
        fs.renameSync(path,newPath);
    } 

    const {token} = req.cookies;
    jwt.verify(token,key,async(err,info)=>{
        if(err) throw err;
        const {id,title, summary, content} = req.body;
        const postDoc = await PostModel.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) == JSON.stringify(info.id);
        if(!isAuthor){
            return res.status(400).json('no permission for you bitch');
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        })
        res.json(postDoc);
    });
})

app.get('/post', async(req,res)=>{
    const post =await PostModel.find({})
    .populate('author',['username'])
    .sort({createdAt :- 1})
    .limit(20);
    res.json(post);
})

app.get('/post/:id',async(req,res)=>{
    const {id} = req.params;
    const post = await PostModel.findById(id).populate('author',['username']);
    res.json(post);
})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
