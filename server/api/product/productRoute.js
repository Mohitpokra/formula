const router = require('express').Router();
const controller = require('./productController');

router.route('/')
    .get(controller.get)
    .post(controller.post);

module.exports = router;