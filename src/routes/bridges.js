const router = require('express').Router();
const { getAllBridges } = require('../controllers/bridges');

router.get('/', getAllBridges);

module.exports = router;
