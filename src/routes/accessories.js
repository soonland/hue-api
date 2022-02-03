const router = require('express').Router();
const { getAllAccessories } = require('../controllers/accessories');

router.get('/', getAllAccessories);

module.exports = router;
