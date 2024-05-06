const express = require("express");
const dotenv = require("dotenv");

//Routes files
const bootcamps = require("./routes/bootcamps");

//Load env variables
dotenv.config({path: './config/config.env'})

const app = express();

//Mount routes 
app.use("/api/v1/bootcamps", bootcamps);

app.get("/", (req, res)=>{
    res.status(200).json({success: true})
})

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `));