const router = require('express').Router();
const { getAllBridges, getSearchNewLights, getNewLights } = require('../controllers/bridges');

router.get('/', getAllBridges);
router.get('/searchNewLights', getSearchNewLights);
router.get('/newLights', getNewLights);

module.exports = router;
