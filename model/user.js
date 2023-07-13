const mongoose=require('mongoose')
const {model, Schema}=require('mongoose')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  name: {
    type: String,
    required:[true, "please provide name"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
  },
});
UserSchema.pre("save",async function( ){
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)  
  
  })
  
  UserSchema.methods.createJWT= function (){
   return jwt.sign(
        { userId: this._id, name: this.name },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );
       
  }
  UserSchema.methods.comparePasswords= async function (candidatePassword){
    const isMatch= await bcrypt.compare(candidatePassword, this.password)
       return isMatch 
  }


module.exports=model('User',UserSchema)