require("dotenv").config();
const express = require("express");
const app = express();
const session = require('express-session');
require("express-async-errors");
const cookieParser = require("cookie-parser");
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
app.use(cookieParser(process.env.JWT_SECRET));
const AuthRouter = require("./routes/auth");
const ImpactRouter = require("./routes/impact");
const InterventionRouter = require("./routes/intervention");
// const docxRouter = require("./routes/docx");
const notFoundHandler = require("./middleware/not-found");
const errorHandler = require("./middleware/errors-handler");
const connectDB = require("./connectdb/connectdb");
 

app.use(express.json());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
  }));
// routes
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/impacts", ImpactRouter);
app.use("/api/v1/interventions", InterventionRouter);
// app.use("",docxRouter)
// middlewares
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(notFoundHandler);
app.use(errorHandler);



const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`app is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();