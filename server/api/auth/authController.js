var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('../../../config/index');
var checkToken = expressJwt({
  secret: config.secrets.jwt
});
var User = require('../user/userModel');
var {
  validateLogin
} = require('../../validation/user/login');

module.exports.decodeToken = function () {
  return function (req, res, next) {
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it

    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer' + req.query.access_token;
    }
    // this will call next if token is valid
    // and send error if its not. It will attached
    // the decoded token to req.user
    checkToken(req, res, next);
  }
}

module.exports.getFreshUser = function () {
  return async function (req, res, next) {
    try {
      let user = await User.findById(req.user._id).exec();
      if (!user) {
        // if no user is found it was not
        // it was a valid JWT but didn't decode
        // to a real user in our DB. Either the user was deleted
        // since the client got the JWT, or
        // it was a JWT from some other source
        res.status(401).send('Unauthorized');
      } else {
        // update req.user with fresh user from
        // stale token data
        req.user = user;
        next();
      }

    } catch (err) {
      Console(err);
      next(err);
    }
  }
}

module.exports.verifyUser = function () {
  return async function (req, res, next) {
    const {
      errors,
      isValid
    } = validateLogin(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      let user = await User.findOne({
        email: req.body.email
      }).exec();
      if (!user) {
        return res.status(401).send('No user with the given email');
      } else {
        // checking the passowords here
        if (!user.authenticate(req.body.password)) {
          res.status(401).send({msg:'Entered password is wrong'});
        } else {
          // if everything is good,
          // then attach to req.user
          // and call next so the controller
          // can sign a token from the req.user._id
          req.user = user;
          next();
        }
      }

    } catch (err) {
        console.log(err);
        next(err);
    }
  }
}

// util method to sign tokens on signup
const signToken = function(id) {
    return jwt.sign(
      {_id: id},
      config.secrets.jwt,
      {expiresIn: config.expireTime}
    );
};

module.exports.signToken = signToken;

module.exports.signin = function(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  var token = signToken(req.user._id);
  return res.json({token: token});
}


  
