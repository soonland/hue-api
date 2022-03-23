const router = require('express').Router();
const { getAllGroupedLight, setState } = require('../controllers/groupedLight');

router.get('/', getAllGroupedLight);
router.post('/:lightId', setState);

module.exports = router;
