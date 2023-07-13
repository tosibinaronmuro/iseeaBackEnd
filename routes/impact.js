const express=require("express")
const router=express.Router()
const {deleteImpact,createImpact,getAllImpacts,UpdateImpact}=require('../controllers/Impact')
const authMiddleware=require('../middleware/auth')

router.route('/').get(getAllImpacts)
router.route('/').post(authMiddleware, createImpact) 

router.route('/:id').patch(authMiddleware, UpdateImpact).delete(authMiddleware, deleteImpact)


module.exports=router 