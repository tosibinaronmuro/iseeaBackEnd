const mongoose=require('mongoose')
const { model, Schema } = require("mongoose");

const MemberSchema = new Schema({
    name: String,
    position: String,
    department:String,
    bio:String,
    memberImage:String
},{timestamps:true});


module.exports=model('Member',MemberSchema)