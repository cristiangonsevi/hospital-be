const userModel = require('../users/model');
const userMedic = require('../medic/model');
const userHospital = require('../hospital/model');

const findUserById = async (id) => {
  try {
    const user = await userModel.findById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};
const findMedicById = async (id) => {
  try {
    const user = await userMedic.findById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};
const findHospitallById = async (id) => {
  try {
    const user = await userHospital.findById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findUserById,
  findMedicById,
  findHospitallById,
};
