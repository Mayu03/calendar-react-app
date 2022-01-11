const mongoose = require("mongoose");

const dbcon = async () => {
  try {
    var connection = await mongoose.connect(process.env.DB);

    console.log("connection done");
  } catch (error) {
    console.log("error" + error.message);
    process.exit(1);
  }
};

module.exports = {
  dbcon,
};
