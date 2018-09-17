const router = require('express').Router();
const auth = loadController(`v1/auth`);
const user = loadController(`v1/user`);

router.get('/me', auth.me);
router.post('/register', user.create);

module.exports = router;
