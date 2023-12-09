const express = require("express");
const { dbConnect } = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoute")
const todoRoute = require("./routes/todoRoute.js");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "hppts://locahost:4000",
    credentials: true,
  })
);
app.use("/api/v1/", userRoute);
app.use("/api/v1/", todoRoute);

dbConnect();

app.get("/", (req , res) => {
    res.send(`<h1> sachin</h1>`)
})

module.exports = app;