const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const connectDB = require("./config/db");

//Load env variables
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

//Routes files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const app = express();

// Set Content Security Policy header
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self'");
  next();
});

app.use(express.static("public"));

//Body Parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//FIle uploading
app.use(fileupload());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent xss attacks
app.use(xss());

//Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100 // limit each IP to 100 requests per `window` (here, // 10 minutes)
  });
  app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount routes
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} `.yellow
      .bold
  )
);

//Handle Unhandled Promise Rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
