const router = require('express').Router();
const { getAllZones, setState } = require('../controllers/zones');

router.get('/', getAllZones);
router.post('/:zoneId', setState);

module.exports = router;
