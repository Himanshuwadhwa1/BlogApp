import mongoose, { Schema } from "mongoose";

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
export {PostModel};