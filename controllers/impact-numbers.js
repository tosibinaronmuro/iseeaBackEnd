const { StatusCodes } = require("http-status-codes");
const { NotFound } = require("../errors");
const ImpactNumber = require("../model/impact-numbers.js");

const getAllimpactNumbers = async (req, res) => {
  const impactNumbers = await ImpactNumber.find();
  if (impactNumbers.length == 0) {
   return res.status(StatusCodes.OK).json({ msg: "there are no impact Numbers" });
  }
  res
    .status(StatusCodes.OK)
    .json({ totalimpactNumbers: impactNumbers.length, impactNumbers: impactNumbers });
};

// comment out
const createimpactNumber = async (req, res) => {
  const impactNumber = await ImpactNumber.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ impactNumber });
};

const UpdateimpactNumber = async (req, res) => {
  const {
    params: { id: impactNumberId },
  } = req;
  const impactNumber = await ImpactNumber.findOneAndUpdate(
    { _id: impactNumberId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ impactNumber: impactNumber });
};

// const deleteimpactNumber = async (req, res) => {
//   const { id: impactNumberId } = req.params;
//   const impactNumber = await ImpactNumber.findOneAndDelete({ _id: impactNumberId });
//   if (!impactNumber) {
//     throw new NotFound(`No impactNumber with Id:${impactNumberId}`);
//   }
//   res.status(StatusCodes.OK).send();
// };

module.exports = {
  // deleteimpactNumber,
  createimpactNumber,
  getAllimpactNumbers,
  UpdateimpactNumber,
};
