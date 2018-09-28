const express = require('express');
const router = express.Router();
const joke = loadController('v1/joke');
const wrap = loadHelper('wrap_async');

router.use(authenticate)
router.get('/random', wrap(joke.randomJoke));

module.exports = router;
