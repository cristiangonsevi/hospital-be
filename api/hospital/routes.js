const epxress = require('express');
const { validateJwt } = require('../../middlewares/validateJwt');
const router = epxress.Router();

const controller = require('./controller');

router.get('/', controller.getHospitals);
router.post('/', [validateJwt], controller.createHospital);
router.put('/:id', [], controller.updateHospital);
router.delete('/:id', [], controller.desactivateHospital);

module.exports = { router };
