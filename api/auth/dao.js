const userModel = require('../users/model');

const getUserByEmail = async (email) => {
  const user = await userModel.findOne({ email });
  return user;
};
module.exports = {
  getUserByEmail,
};
