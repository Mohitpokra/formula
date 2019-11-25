const router = require('express').Router();
var { verifyUser, signin } = require('./authController')

router.post('/singin', verifyUser(), signin);

module.exports = router;