const router = require('express').Router();
const user = loadController(`api/v1/user`);

router.post('/', user.create);
router.get('/', user.findAll);
router.get('/:userId', user.findOne);
router.put('/:userId', user.update);
router.delete('/:userId', user.destroy);

module.exports = router;
