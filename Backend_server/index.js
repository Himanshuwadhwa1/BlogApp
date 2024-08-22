import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {userAuth, userSign} from "./middlewares/bcrypt.js" //for encrypting passwords before storing in database
import cookieParser from "cookie-parser";
import fs from "fs"
import {userModel,PostModel} from "./db/db.js"
import {uploadMiddle} from "./middlewares/multer.js"
import { dirname } from "path";
import { fileURLToPath } from "url";
import {router} from "./routes/login.js"
import { jwtVerify } from "./middlewares/jwt.js";
import { registerRouter } from "./routes/register.js";

import dotenv from "dotenv";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

;
const key = process.env.key; //write your own secret key



const app = express();
const port = process.env.port;
app.use(express.json());
app.use(cookieParser()); //to parse cookie we get from webpage as req
app.use('/uploads',express.static(__dirname+'/uploads'));


app.use(cors({
    origin: process.env.origin,
    credentials: true,
    }
));
app.use('/login',router);
app.use('/register',registerRouter)

app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    try{
        jwt.verify(token,key,(err,info)=>{
            if(err) throw err;
            res.json(info);
        });
    }catch(err){
        console.log(err);
        res.json({message: "something wrong"})
    }
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

app.put('/post',uploadMiddle.single('file') ,jwtVerify,async(req,res)=>{
    let newPath = null;
    if(req.file){
        const {originalname , path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length -1];
        newPath = path + '.' + ext;
        fs.renameSync(path,newPath);
    } 
    const info = req.info;
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
