const router = require('express').Router();
const { getAllDevices } = require('../controllers/devices');

router.get('/', getAllDevices);

module.exports = router;
