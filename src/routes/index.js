const router = require('express').Router();
const lights = require('./lights');
const rooms = require('./rooms');

router.use('/api/lights', lights);
router.use('/api/rooms', rooms);

module.exports = router;
