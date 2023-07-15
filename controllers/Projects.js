const multer = require("multer");
const { StatusCodes } = require("http-status-codes");
const { NotFound } = require("../errors");
const Project = require("../model/Project");
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

const getAllProjects = async (req, res) => {
  const projects = await Project.find();
  if (projects.length == 0) {
    res.status(StatusCodes.OK).json({ msg: "there are no Projects" });
  } 
  res
    .status(StatusCodes.OK)
    .json({ totalProjects: projects.length, projects:  projects });
};

const createProject = async (req, res) => {
  const { name, content } = req.body;
  const projectImage = req.file.filename;
  const project = await Project.create({
    name:name,
    content:content,
    projectImage:projectImage
    // put `uploads/${projectImage}`
  });
  res.status(StatusCodes.CREATED).json({ project });
};

const UpdateProject = async (req, res) => {
  const {
    params: { id: ProjectId },
  } = req;
  const project = await Project.findOneAndUpdate(
    { _id: ProjectId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  console.log({...req.body})
  res.status(StatusCodes.OK).json({ project: project });
};

const deleteProject = async (req, res) => {
  const { id: ProjectId } = req.params;
  const project = await Project.findOneAndDelete({ _id: ProjectId });
  if (!project) {
    throw new NotFound(`No Project with Id:${ProjectId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  deleteProject,
  createProject,
  getAllProjects,
  UpdateProject,
};
