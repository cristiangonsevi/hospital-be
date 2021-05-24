const medicModel = require('./model');

const getMedics = async () => {
  const medics = await medicModel
    .find()
    .populate('user', 'name image')
    .populate('hospital', 'name image');
  return medics;
};
const createMedic = async (data, id) => {
  const newMedic = new medicModel({ user: id, ...data });
  return await newMedic.save();
};
const updateMedic = async () => {};
const desactivateMedic = async () => {};

module.exports = {
  getMedics,
  createMedic,
  updateMedic,
  desactivateMedic,
};
