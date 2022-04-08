const router = require('express').Router();
const { getAllRooms, setState, updateRoom } = require('../controllers/rooms');

router.get('/', getAllRooms);
router.post('/:roomId', setState);
router.put('/:roomId', updateRoom);

module.exports = router;
