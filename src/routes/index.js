const router = require('express').Router();
const lights = require('./lights');
const groups = require('./groups');

router.use('/api/lights', lights);
router.use('/api/groups', groups);

module.exports = router;
