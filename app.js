require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoSanitize = require("express-mongo-sanitize");
app.use(cookieParser(process.env.JWT_SECRET));

// import routes
const AuthRouter = require("./routes/auth");
const ImpactRouter = require("./routes/impact");
const InterventionRouter = require("./routes/intervention");
const ProjectRouter = require("./routes/projects");
const MemberRouter = require("./routes/members");
const NumberRouter = require("./routes/numbers");
const ReportRouter = require("./routes/annual-report");

// import middlewares
const notFoundHandler = require("./middleware/not-found");
const errorHandler = require("./middleware/errors-handler");
const connectDB = require("./connectdb/connectdb");
const { StatusCodes } = require("http-status-codes");

app.use(express.json());
// CORS setup
app.use(cors(corsOptions));

app.use('/uploads', express.static('uploads'));
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// routes
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/impacts", ImpactRouter);
app.use("/api/v1/interventions", InterventionRouter);
app.use("/api/v1/projects", ProjectRouter);
app.use("/api/v1/members", MemberRouter);
app.use("/api/v1/numbers", NumberRouter);
app.use("/api/v1/reports", ReportRouter);
app.get("/",(req,res)=>{
  res.status(StatusCodes.OK).send("Welcome to ISEEA backend site")
})

// middlewares
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());


app.use(xss());
app.use(mongoSanitize());
app.use(notFoundHandler);
app.use(errorHandler);
// experimental
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });


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