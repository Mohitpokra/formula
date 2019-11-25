const router = require('express').Router();
const controller = require('./subCategoryController');

router.param('slug', controller.params)
router.route('/')
    .get(controller.get)
    .post(controller.post)

router.get('/:slug', controller.getOne);

module.exports = router;