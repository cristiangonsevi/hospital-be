const medicDao = require('./dao');
const { multiple, single } = require('./dto');

const getMedics = async (req, res) => {
  try {
    const hospitals = await medicDao.getMedics();
    res.status(200).json({
      status: 200,
      data: multiple(hospitals),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      messages: 'Error processing request',
    });
  }
};
const createMedic = async (req, res) => {
  try {
    const newMedic = await medicDao.createMedic(req.body, req.id);
    res.status(200).json({
      status: 200,
      data: single(newMedic),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      messages: 'Error processing request',
    });
  }
};
const updateMedic = async (req, res) => {
  medicDao.updateMedic(req.params.id);
  res.status(200).json({
    status: 200,
    message: 'updateMedic',
  });
};
const desactivateMedic = async (req, res) => {
  medicDao.desactivateMedic(req.params.id);
  res.status(200).json({
    status: 200,
    message: 'desactivateMedic',
  });
};

module.exports = {
  getMedics,
  createMedic,
  updateMedic,
  desactivateMedic,
};
