const express=require("express")
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
  });
  const upload = multer({ storage: storage });
const router=express.Router()
const {deleteProject,createProject,getAllProjects,UpdateProject}=require('../controllers/Projects')
const authMiddleware=require('../middleware/auth')

router.route('/').get(getAllProjects)
router.route('/').post(authMiddleware,upload.single('projectImage'), createProject) 
router.route('/:id').patch(authMiddleware, UpdateProject).delete(authMiddleware, deleteProject)


module.exports=router 