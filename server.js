const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const colors = require("colors");
const connectDB = require("./config/db");

//Load env variables
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

//Routes files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

const app = express();

//Body Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routes
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

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
