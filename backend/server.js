require("dotenv").config();
const bodyparser = require("body-parser");
const express = require("express");
var connection = require("./config/db");
const calenderRoute = require("../backend/routes/calenderRoutes");
var cors = require("cors");

connection.dbcon();
const app = express();
app.use("/assets", express.static("assets"));
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use("/api/calender", calenderRoute);

app.listen(process.env.PORT, () => {
  console.log("server running");
});
