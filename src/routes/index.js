const router = require('express').Router();
const lights = require('./lights');
const rooms = require('./rooms');
const zones = require('./zones');

router.use('/api/lights', lights);
router.use('/api/rooms', rooms);
router.use('/api/zones', zones);

module.exports = router;
