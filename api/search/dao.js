const userModel = require('../users/model');
const medicModel = require('../medic/model');
const hospitalModel = require('../hospital/model');

const searchAll = async (query) => {
  const [users, medics, hospitals] = await Promise.all([
    userModel.find({
      name: query,
    }),
    medicModel
      .find({
        name: query,
      })
      .populate('user', 'name image')
      .populate('hospital', 'name image'),
    hospitalModel
      .find({
        name: query,
      })
      .populate('user', 'name image'),
  ]);
  return { users, medics, hospitals };
};

const searchUsers = async (query) => {
  try {
    const users = await userModel.find({
      name: query,
    });
    return users;
  } catch (error) {
    console.log(error);
  }
};
const searchMedics = async (query) => {
  try {
    const medics = await medicModel
      .find({
        name: query,
      })
      .populate('user', 'name image')
      .populate('hospital', 'name image');
    return medics;
  } catch (error) {
    console.log(error);
  }
};
const searchHospitals = async (query) => {
  try {
    const hospitals = await hospitalModel
      .find({
        name: query,
      })
      .populate('user', 'name image');
    return hospitals;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  searchAll,
  searchUsers,
  searchMedics,
  searchHospitals,
};
