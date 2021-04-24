const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Data Base working");
  } catch (error) {
    console.log(error);
    throw new Error("Error at the moment of initialize the database");
  }
};

module.exports = {
  dbConnection,
};
