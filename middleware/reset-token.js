const { isValidObjectId } = require("mongoose");
const {BadRequest}=require('../errors');
const User = require("../model/user");
const ResetTokenSchema = require("../model/reset-token");

exports.isResetTokenValid=async(req,res,next)=>{
const {token,id}=req.query
if (!token||!id) {
    throw new BadRequest("invalid request ");
  }
  if(!isValidObjectId(id)){
    throw new BadRequest("User does not exist");
  }
  const user=await User.findById(id)
  if(!user){
    throw new BadRequest("User does not exist");
  }

  const resetToken=await ResetTokenSchema.findOne({owner:user._id})
  if(!resetToken){
    throw new BadRequest("invalid token");
  }
  const isValid=await resetToken.compareToken(token)
  if(!isValid){
    throw new BadRequest("reset token is invalid  ");
  }
  req.user=user
  next()
}