const mongoose=require('mongoose')
const { model, Schema } = require("mongoose");

const ProjectSchema = new Schema({
    name: String,
    content: String,
    projectImage:String
},{timestamps:true});


module.exports=model('Project',ProjectSchema)