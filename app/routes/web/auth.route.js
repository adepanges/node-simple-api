const router = require('express').Router();
const auth = loadController(`web/v1/auth`);

router.get('/', auth.login);

module.exports = router;
