const express= require('express')
const router=express.Router()
const {register,login,logout,forgotPassword,resetPassword}=require('../controllers/auth')
const { isResetTokenValid } = require('../middleware/reset-token')

router.route('/register').post(register)
router.route('/login').post(login)
router.get('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', isResetTokenValid, resetPassword);
 

module.exports=router