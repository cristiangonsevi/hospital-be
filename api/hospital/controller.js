const hospitalDao = require('./dao');
const { single, multiple } = require('./dto');

const getHospitals = async (req, res) => {
  try {
    const hospitals = await hospitalDao.getHospitals();
    res.status(200).json({
      status: 200,
      data: multiple(hospitals),
    });
  } catch (error) {
    console.log(error);
    res.status(502).json({
      status: 502,
      messages: 'Error procesing request!',
    });
  }
};
const createHospital = async (req, res) => {
  try {
    const hospital = await hospitalDao.createHospital(req.body, req.id);
    res.status(200).json({
      status: 200,
      data: single(hospital),
    });
  } catch (error) {
    console.log(error);
    res.status(502).json({
      status: 502,
      messages: 'Error procesing request!',
    });
  }
};
const updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const findHospitalById = await hospitalDao.getHospitalById(id);
    if (!findHospitalById) {
      return res.status(404).json({
        status: 404,
        messages: 'Hospital not found',
      });
    }
    hospitalDao.updateHospital(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'updateHospital',
    });
  } catch (error) {
    console.log(error);
    res.status(502).json({
      status: 502,
      messages: 'Error procesing request!',
    });
  }
};
const desactivateHospital = async (req, res) => {
  hospitalDao.desactivateHospital(req.params.id);
  res.status(200).json({
    status: 200,
    message: 'desactivateHospital',
  });
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  desactivateHospital,
};
