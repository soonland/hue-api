const router = require('express').Router();
const { getAllZones, setState, addNewZone, deleteZone } = require('../controllers/zones');

router.get('/', getAllZones);
router.post('/', addNewZone);
router.delete('/:zoneId', deleteZone);
router.post('/:zoneId', setState);

module.exports = router;
