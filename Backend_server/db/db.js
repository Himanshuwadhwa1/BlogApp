import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path: '.env'
});

const user = process.env.username1
const pass = process.env.password

const str = `mongodb+srv://${user}:${pass}@cluster0.uvng3.mongodb.net/blog`

mongoose.connect(str) //add your mongo connection url
const postSchema = new mongoose.Schema({
    title : String,
    summary: String,
    content: String,
    cover:String, // path to file inside uploads 
    author: {type: Schema.Types.ObjectId, ref:'User'}
},{
    timestamps:true // add createdAt and updatedAt fields
});
const PostModel = mongoose.model('Post', postSchema);


const UserSchema = new mongoose.Schema({
    username : { type: String, min: 4, required: true, unique:true },
    password : { type : String, required: true},
})

const userModel = mongoose.model('User', UserSchema);

export {
    PostModel,
    userModel,
    pass,
    user,
};