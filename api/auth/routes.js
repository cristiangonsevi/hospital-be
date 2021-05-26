const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { check } = require('express-validator');
const { checkFields } = require('../../middlewares/checkFields');

router.post(
  '/',
  [
    check('password', 'Field is required').not().isEmpty(),
    check('email', 'Field must be an email valid').isEmail(),
    checkFields,
  ],
  controller.login
);
router.post(
  '/google',
  [
    check('token', 'Field is required').not().isEmpty(),
    checkFields,
  ],
  controller.googleSignIn
);

module.exports = { router };
