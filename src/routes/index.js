const router = require('express').Router();
const lights = require('./lights');
const rooms = require('./rooms');
const zones = require('./zones');
const devices = require('./devices');

router.use('/api/lights', lights);
router.use('/api/rooms', rooms);
router.use('/api/zones', zones);
router.use('/api/devices', devices);

module.exports = router;
