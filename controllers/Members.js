const multer = require("multer");
const { StatusCodes } = require("http-status-codes");
const { NotFound } = require("../errors");
const Member = require("../model/member.js");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

const getAllMembers = async (req, res) => {
  const members = await Member.find();
  if (members.length == 0) {
   return res.status(StatusCodes.OK).json({ msg: "there are no Members" });
  }
  res
    .status(StatusCodes.OK)
    .json({ totalMembers: members.length, members: members });
};

const createMember = async (req, res) => {
  const { name, position, department, bio } = req.body;
  const memberImage = req.file.filename;
  const member = await Member.create({
    name: name,
    position: position,
    department: department,
    bio: bio,
    memberImage: memberImage,
    // put `uploads/${MemberImage}`
  });
  res.status(StatusCodes.CREATED).json({ member });
};

const UpdateMember = async (req, res) => {
  const {
    params: { id: MemberId },
  } = req;
  const member = await Member.findOneAndUpdate(
    { _id: MemberId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ member: member });
};

const deleteMember = async (req, res) => {
  const { id: MemberId } = req.params;
  const member = await Member.findOneAndDelete({ _id: MemberId });
  if (!member) {
    throw new NotFound(`No Member with Id:${MemberId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  deleteMember,
  createMember,
  getAllMembers,
  UpdateMember,
};
