const hospitalModel = require('./model');

const getHospitals = async () => {
  try {
    const hospitals = await hospitalModel.find().populate('user', 'name image');
    return hospitals;
  } catch (error) {
    console.log(error);
  }
};
const getHospitalById = async (id) => {
  const hospital = await hospitalModel.findById(id);
  return hospital;
};
const createHospital = async (data, id) => {
  try {
    const newHospital = new hospitalModel({ user: id, ...data });
    return await newHospital.save();
  } catch (error) {
    console.log(error);
  }
};
const updateHospital = async () => {};
const desactivateHospital = async () => {};

module.exports = {
  getHospitals,
  getHospitalById,
  createHospital,
  updateHospital,
  desactivateHospital,
};
