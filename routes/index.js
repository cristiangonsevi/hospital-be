const express = require('express');
const router = express.Router();

const userRoutes = require('../api/users/routes');
const authRoutes = require('../api/auth/routes');
const hospitalRoutes = require('../api/hospital/routes');
const medicRoutes = require('../api/medic/routes');
const searchRoutes = require('../api/search/routes');
const uploadRoutes = require('../api/upload/routes');

router.get('/', (res) => {
  res.json('API V1 Working');
});
router.use('/user', userRoutes.router);
router.use('/auth', authRoutes.router);
router.use('/hospital', hospitalRoutes.router);
router.use('/medic', medicRoutes.router);
router.use('/search', searchRoutes.router);
router.use('/upload', uploadRoutes.router);

module.exports = { router };
