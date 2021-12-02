const router = require('express').Router();
const { getAllGroups, setState, deleteGroup } = require('../controllers/groups');

router.get('/', getAllGroups);
router.delete('/:groupId', deleteGroup);
router.post('/:groupId', setState);

module.exports = router;
