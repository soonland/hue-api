const router = require('express').Router();
const { getAllRooms, setState } = require('../controllers/rooms');

router.get('/', getAllRooms);
router.post('/:roomId', setState);

module.exports = router;
