const mongoose=require('mongoose')
const { model, Schema } = require("mongoose");

const InterventionSchema = new Schema({
  number: {
    type: String,
    required:[true, "please provide a number"],
  
  },
  story:{
    type:String,
    required:[true, "please provide content"]
  } 
},{timestamps:true});


module.exports=model('Intervention',InterventionSchema)