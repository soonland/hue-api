const router = require('express').Router();
const { getAllLights, setState } = require('../controllers/lights');

router.get('/', getAllLights);
router.post('/:lightId', setState);

module.exports = router;
