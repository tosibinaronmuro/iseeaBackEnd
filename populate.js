require("dotenv").config();

const connectDB = require("./connectdb/connectdb");
const impact = require("./model/impact");
const intervention = require("./model/humanitarian-intervnetion");

const jsonimpacts = require("./impact.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await impact.deleteMany();
    await impact.create(jsonimpacts);
    console.log("success!!!!");
    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};

const jsonintervention = require("./humanitarian-intervnetion.json");

const start2 = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await intervention.deleteMany();
    await intervention.create(jsonintervention);
    console.log("success!!!!");
    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};
start()
start2();
