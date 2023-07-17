const multer = require("multer");
const { StatusCodes } = require("http-status-codes");
const { NotFound } = require("../errors");
const Report = require("../model/annual-report");
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

const getAllReports = async (req, res) => {
  const reports = await Report.find();
  if (reports.length == 0) {
    return res.status(StatusCodes.OK).json({ msg: "there are no reports" });
  }
  res
    .status(StatusCodes.OK)
    .json({ totalreports: reports.length, reports: reports });
};

const createReport = async (req, res) => {
  const { name} = req.body;
  const reportFile = req.file.filename;
  const report = await Report.create({
    name: name,
    reportFile: reportFile,
    // put `uploads/${reportFile}`
  });
  res.status(StatusCodes.CREATED).json({ report });
};

const UpdateReport = async (req, res) => {
  const {
    params: { id: reportId },
  } = req;
  const report = await Report.findOneAndUpdate(
    { _id: reportId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  console.log({ ...req.body });
  res.status(StatusCodes.OK).json({ report: report });
};

const deleteReport = async (req, res) => {
  const { id: reportId } = req.params;
  const report = await Report.findOneAndDelete({ _id: reportId });
  if (!report) {
    throw new NotFound(`No report with Id:${reportId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  deleteReport,
  createReport,
  getAllReports,
  UpdateReport,
};
