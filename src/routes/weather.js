const router = require('express').Router();
const { updateWeather } = require('../controllers/weather');

router.get('/', updateWeather);

module.exports = router;
