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
const mongoSanitize = require("express-mongo-sanitize");

// Middlewares
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors()); 
app.options('*', cors()); 
app.use(xss());
app.use(mongoSanitize());
app.use(notFoundHandler);
app.use(errorHandler);

// Express JSON Parser and Cookie Parser
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// Session Middleware
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Experimental CORS Setup
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// Import routes
const AuthRouter = require("./routes/auth");
const ImpactRouter = require("./routes/impact");
const InterventionRouter = require("./routes/intervention");
const ProjectRouter = require("./routes/projects");
const MemberRouter = require("./routes/members");
const NumberRouter = require("./routes/numbers");
const ReportRouter = require("./routes/annual-report");

// Routes
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/impacts", ImpactRouter);
app.use("/api/v1/interventions", InterventionRouter);
app.use("/api/v1/projects", ProjectRouter);
app.use("/api/v1/members", MemberRouter);
app.use("/api/v1/numbers", NumberRouter);
app.use("/api/v1/reports", ReportRouter);

// Root route
app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("Welcome to ISEEA backend site");
});

// Error handler middleware (404 and other errors)
app.use(notFoundHandler);
app.use(errorHandler);

const { StatusCodes } = require("http-status-codes");

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
