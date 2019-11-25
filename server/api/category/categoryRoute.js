const router = require('express').Router();
const controller = require('./categoryController');

router.param('slug', controller.params);

router.route('/')
    .get(controller.get)
    .post(controller.post);

router.route('/:slug')
      .get(controller.getOne);

module.exports = router;