const { StatusCodes } = require("http-status-codes");
const { NotFound } = require("../errors");
const Impact = require("../model/impact");

const getAllImpacts = async (req, res) => {
  const Impacts = await Impact.find();
  if (Impacts.length == 0) {
    res.status(StatusCodes.OK).json({ msg: "there are no Impacts" });
  }
  res
    .status(StatusCodes.OK)
    .json({ totalImpacts: Impacts.length, Impacts: Impacts });
};

const createImpact = async (req, res) => {
  const impact = await Impact.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ impact });
};

const UpdateImpact = async (req, res) => {
  const {
    params: { id: ImpactId },
  } = req;
  const impact = await Impact.findOneAndUpdate(
    { _id: ImpactId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ impact: impact });
};

const deleteImpact = async (req, res) => {
  const { id: impactId } = req.params;
  const impact = await Impact.findOneAndDelete({ _id: impactId });
  if (!impact) {
    throw new NotFound(`No Impact with Id:${impactId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  deleteImpact,
  createImpact,
  getAllImpacts,
  UpdateImpact,
};
