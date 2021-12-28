const router = require('express').Router();
const lights = require('./lights');
const rooms = require('./rooms');
const zones = require('./zones');
const accessories = require('./accessories');

router.use('/api/lights', lights);
router.use('/api/rooms', rooms);
router.use('/api/zones', zones);
router.use('/api/accessories', accessories);

module.exports = router;
