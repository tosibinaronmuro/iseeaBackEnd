const mongoose=require('mongoose')
const { model, Schema } = require("mongoose");

const ImpactNumbers = new Schema({
  money: {
    type: Number,
    required:[true, "please provide a number"],
  
  },
  children:{
    type:Number,
    required:[true, "please provide number of Children"]
  },
  projects:{
    type:Number,
    required:[true, "please provide number of projects"]
  } 
},{timestamps:true});


module.exports=model('ImpactNumbers',ImpactNumbers)