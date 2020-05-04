const router = require('express').Router();
const controller = require('./userController');
var { decodeToken, getFreshUser } = require('../auth/authController');

router.route('/:id')
    .put(decodeToken(), getFreshUser(), controller.put)
    .delete(decodeToken(), getFreshUser(), controller.delete) 

router.route('/')
    .get(decodeToken(), getFreshUser(), controller.get)
    .post(decodeToken(), getFreshUser(), controller.post)

module.exports = router;