const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");

const MemberSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name"],
    },
    position: {
      type: String,
      required: [true, "please provide a position"],
    },
    department: {
      type: String,
      required: [true, "please provide a department"],
      enum: {
        values: ["management", "socials"],
        message: "{VALUE} is not supported",
      },
    },
    bio: String,
    memberImage: String,
  },
  { timestamps: true }
);

module.exports = model("Member", MemberSchema);
