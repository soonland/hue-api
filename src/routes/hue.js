const router = require('express').Router();
const hue = require('../controllers/hue');

router.get('/bridges', hue.getBridges);
router.get('/lights', hue.getLights);
router.get('/rooms', hue.getRooms);

module.exports = router;
