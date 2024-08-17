import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username : { type: String, min: 4, required: true, unique:true },
    password : { type : String, required: true},
})

const userModel = mongoose.model('User', UserSchema);

export {userModel};