const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calenderSchema = new Schema({
  title: String,
  desc: String,
  start: String,
  end: String,
  file: String,
});

const calendermodel = mongoose.model("calendar", calenderSchema);
module.exports = calendermodel;
