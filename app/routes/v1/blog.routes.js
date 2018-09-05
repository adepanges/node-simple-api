const router = require('express').Router();
const blog = loadController(`v1/blog`);

router.post('/', blog.create);
router.get('/', blog.findAll);
router.get('/:blogId', blog.findOne);
router.put('/:blogId', blog.update);
router.delete('/:blogId', blog.destroy);

module.exports = router;
