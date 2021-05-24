const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
const { DB_CONNECTION } = process.env;

const dbConnection = async () => {
  try {
    mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('conection to db');
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { dbConnection };
