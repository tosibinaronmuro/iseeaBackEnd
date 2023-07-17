const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");

const ReportSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name"],
    },
    reportFile: String,
  },
  { timestamps: true }
);

module.exports = model("Report", ReportSchema);
