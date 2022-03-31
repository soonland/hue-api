const router = require('express').Router();
const { getAllDevices, setState } = require('../controllers/devices');

router.get('/', getAllDevices);
router.post('/:lightId', setState);

module.exports = router;
