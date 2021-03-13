const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes/indexRoutes");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoURI =
  process.env.NODE_ENV !== "test" ? process.env.DB : process.env.DB_TEST;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err);
    console.log("DB Connection not successful");
  });

app.use(cors());

app.use("/api", routes);

module.exports = app;
