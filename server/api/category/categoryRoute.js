const router = require('express').Router();
const controller = require('./categoryController');

router.route('/')
    .get(controller.get)
    .post(controller.post)

module.exports = router;