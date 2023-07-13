const mongoose=require('mongoose')
const { model, Schema } = require("mongoose");

const ImpactSchema = new Schema({
  author: {
    type: String,
    required:[true, "please provide a title"],
  
  },
  story:{
    type:String,
    required:[true, "please provide content"]
  } 
},{timestamps:true});


module.exports=model('Impact',ImpactSchema)