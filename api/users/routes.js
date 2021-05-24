const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { checkFields } = require('../../middlewares/checkFields');
const { validateJwt } = require('../../middlewares/validateJwt');

const controller = require('./controller');

router.get('/', validateJwt, controller.getUsers);
router.post(
  '/',
  [
    validateJwt,
    check('name', 'Field is required').not().isEmpty(),
    check('password', 'Field is required').not().isEmpty(),
    check('email', 'Field must be an email valid').isEmail(),
    checkFields,
  ],
  controller.createUsers
);
router.put(
  '/:id',
  [
    validateJwt,
    check('name', 'Field is required').not().isEmpty(),
    check('email', 'Field must be an email valid').isEmail(),
    checkFields,
  ],
  controller.updateUser
);
router.delete('/:id', validateJwt, controller.desactivateUser);

module.exports = { router };
