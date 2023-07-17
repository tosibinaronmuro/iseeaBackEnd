const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name"],
    },
    content: {
      type: String,
      required: [true, "please provide content"],
    },
    projectImage: String,
  },
  { timestamps: true }
);

module.exports = model("Project", ProjectSchema);
