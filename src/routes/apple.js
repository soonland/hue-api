const router = require('express').Router();
const { getAllAppleDevices } = require('../controllers/appleDevices');

router.get('/', getAllAppleDevices);

module.exports = router;
