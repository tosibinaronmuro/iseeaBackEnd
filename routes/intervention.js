const express=require("express")
const router=express.Router()
const {deleteIntervention,createIntervention,getAllInterventions,UpdateIntervention}=require('../controllers/humanitarian-intervnetion.js')
const authMiddleware=require('../middleware/auth')

router.route('/').get(getAllInterventions)
router.route('/').post(authMiddleware, createIntervention) 

router.route('/:id').patch(authMiddleware, UpdateIntervention).delete(authMiddleware, deleteIntervention)


module.exports=router 