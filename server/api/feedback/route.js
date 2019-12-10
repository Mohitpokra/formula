const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.sendMail);

module.exports = router;