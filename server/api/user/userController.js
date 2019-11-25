var User = require('./userModel');
var {
  validateSingUp
} = require('../../validation/user/signup');
var { signToken } = require('../auth/authController');

module.exports.params = async function (req, resp, next, id) {
  try {
    let user = await User.findById(id).exec();
    if (!user) {
      return resp.status(400).json({
        msg: 'User with this id not found'
      })
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports.get = async function (req, resp, next) {
  try {
    let users = await User.find({}).exec();
    return resp.json(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports.getOne = function (req, resp, next) {
  var user = req.user;
  return resp.json(user);
}

module.exports.post = async function (req, resp, next) {

   const {errors, isValid} = validateSingUp(req.body);

  if (!isValid) {
    return resp.status(400).json(errors);
  }
 
  try {
    let user = await User.findOne({email: req.body.email}, 'email').exec();
    if(user) {
      return resp.json("User with this email is already exits");
    }
    user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.password = req.body.password;
    user = await user.save();
    var token = signToken(user._id);
    return resp.json({token: token});
  } catch(err) {
      console.log(err);
      next(err);
  }

}
