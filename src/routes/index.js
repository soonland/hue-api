const router = require('express').Router();
const bridges = require('./bridges');
const devices = require('./devices');
const lights = require('./lights');
const groupedLight = require('./groupedLight');
const rooms = require('./rooms');
const zones = require('./zones');
const accessories = require('./accessories');
const updateWeather = require('./weather');
const apple = require('./apple');

router.use('/api/bridges', bridges);
router.use('/api/devices', devices);
router.use('/api/lights', lights);
router.use('/api/groupedLight', groupedLight);
router.use('/api/rooms', rooms);
router.use('/api/zones', zones);
router.use('/api/accessories', accessories);
router.use('/api/weather', updateWeather);

router.use('/api/apple', apple);

module.exports = router;
