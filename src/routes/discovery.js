const router = require('express').Router();
const discovery = require('../controllers/discovery');

router.get('/', discovery.getServices);
router.post('/', discovery.start);

module.exports = router;
