const userModel = require('./model');

const getUsers = async (since, limit) => {
  const users = await userModel.find().skip(since).limit(limit);
  return users;
};
const getUserByEmail = async (email) => {
  const user = await userModel.findOne({ email });
  return user;
};
const getUserById = async (id) => {
  try {
    const user = await userModel.findById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};
const createUsers = async (user) => {
  const newUser = new userModel(user);
  await newUser.save();
  return newUser;
};
const updateUser = async (id, user) => {
  try {
    await userModel.findByIdAndUpdate(id, user);
  } catch (error) {
    console.log(error);
  }
};
const activeUser = async (id) => {
  try {
    await userModel.findByIdAndUpdate(id, { active: true });
  } catch (error) {
    console.log(error);
  }
};
const inactiveUser = async (id) => {
  try {
    await userModel.findByIdAndUpdate(id, { active: false });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  createUsers,
  updateUser,
  activeUser,
  inactiveUser
};
