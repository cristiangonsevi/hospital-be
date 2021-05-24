const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { check } = require('express-validator');
const expressFileuload = require('express-fileupload');
const { checkFields } = require('../../middlewares/checkFields');
const { validateJwt } = require('../../middlewares/validateJwt');

router.use(expressFileuload());

router.put(
  '/:collection/:id',
  [
    validateJwt,
    check('id', 'Must be a mongo id valid').isMongoId(),
    checkFields,
  ],
  controller.fileUpload
);
router.get(
  '/:collection/:image',
  controller.showImages
);

module.exports = { router };
