const router = require('express').Router();
const { getAllAppleDevices } = require('../controllers/apple');

router.get('/', getAllAppleDevices);

module.exports = router;
