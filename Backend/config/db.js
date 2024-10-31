const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB Connected Successfully");
    })
    .catch((error) => {
      console.log("Something went wrong while connecting to DB ");
      console.log(error.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
