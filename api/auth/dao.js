const userModel = require('../users/model');

const getUserByEmail = async (email) => {
  const user = await userModel.findOne({ email });
  return user;
};
const createUser = async (user) => {
  const newUser = new userModel(user);
  await newUser.save();
  return newUser;
};
const updateTypeSignIn = async (user) => {
  return await userModel.findByIdAndUpdate(user.id, {
    google: true,
    image: user.image,
  });
};
module.exports = {
  getUserByEmail,
  createUser,
  updateTypeSignIn,
};
