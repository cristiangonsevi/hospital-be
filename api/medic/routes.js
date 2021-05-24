const epxress = require('express');
const router = epxress.Router();
const { check } = require('express-validator');
const { checkFields } = require('../../middlewares/checkFields');
const { validateJwt } = require('../../middlewares/validateJwt');

const controller = require('./controller');

router.get('/', controller.getMedics);
router.post(
  '/',
  [
    validateJwt,
    check('name', 'Field is required').not().isEmpty(),
    check('hospital', 'Hospital must be a valid id').isMongoId(),
    checkFields,
  ],
  controller.createMedic
);
router.put('/', [], controller.updateMedic);
router.delete('/', [], controller.desactivateMedic);

module.exports = { router };
