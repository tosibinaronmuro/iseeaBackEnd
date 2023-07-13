const mongoose=require('mongoose')
const {model,Schema}=require('mongoose')
const bcrypt=require('bcryptjs')

const  resetTokenSchema=new Schema({
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true

    },
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        expires:10,
        default:Date.now()
    }
})

resetTokenSchema.pre("save",async function(next ){
    if(this.isModified("token")){
        const salt= await bcrypt.genSalt(10);
        const hash= await bcrypt.hash(this.token,salt)  
        this.token=hash
    }
  
  next()
  })
  resetTokenSchema.methods.compareToken= async function (token){
    const isMatch= bcrypt.compareSync(token, this.token)
       return isMatch 
  }
  module.exports=model("ResetTokenSchema",resetTokenSchema)