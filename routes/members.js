const express=require("express")
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/team-members/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
  });
  const upload = multer({ storage: storage });
const router=express.Router()
const {deleteMember,createMember,getAllMembers,UpdateMember}=require('../controllers/Members.js')
const authMiddleware=require('../middleware/auth.js')

router.route('/').get(getAllMembers)
router.route('/').post(authMiddleware,upload.single('memberImage'), createMember) 
router.route('/:id').patch(authMiddleware, UpdateMember).delete(authMiddleware, deleteMember)


module.exports=router 