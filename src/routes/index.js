const router = require('express').Router();
const discovery = require('./discovery');
const updateWeather = require('./weather');
const apple = require('./apple');
const hue = require('./hue');

router.get('/', (req, res) => {
  res.send();
});
router.use('/api/weather', updateWeather);
router.use('/api/discovery', discovery);

router.use('/api/apple', apple);
router.use('/api/hue', hue);

module.exports = router;
