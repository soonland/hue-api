const router = require('express').Router();
const lights = require('./lights');

router.use('/api/lights/', lights);

module.exports = router;
