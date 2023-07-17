const { StatusCodes } = require("http-status-codes");
const { NotFound } = require("../errors");
const Intervention = require("../model/humanitarian-intervnetion.js");

const getAllInterventions = async (req, res) => {
  const interventions = await Intervention.find();
  if (interventions.length == 0) {
  return  res.status(StatusCodes.OK).json({ msg: "there are no Interventions" });
  }
  res
    .status(StatusCodes.OK)
    .json({ totalInterventions: interventions.length, interventions: interventions });
};

const createIntervention = async (req, res) => {
  const intervention = await Intervention.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ intervention });
};

const UpdateIntervention = async (req, res) => {
  const {
    params: { id: InterventionId },
  } = req;
  const intervention = await Intervention.findOneAndUpdate(
    { _id: InterventionId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ intervention: intervention });
};

const deleteIntervention = async (req, res) => {
  const { id: InterventionId } = req.params;
  const intervention = await Intervention.findOneAndDelete({ _id: InterventionId });
  if (!intervention) {
    throw new NotFound(`No Intervention with Id:${InterventionId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  deleteIntervention,
  createIntervention,
  getAllInterventions,
  UpdateIntervention,
};
