const router = require('express').Router();
const discovery = require('../controllers/discovery');

router.get('/', discovery.getDiscoveredServices);
router.post('/', discovery.start);

module.exports = router;
