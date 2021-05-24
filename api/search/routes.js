const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.searchAll);
router.get('/:collection', controller.searchCollection);

module.exports = { router };
