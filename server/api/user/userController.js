var User = require('./userModel');
var Public = require('../public/publicModel');
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

    let publicList = await Public.findOne({}).populate({
      path: `main_categories`,
      populate: [{
          path: 'categories',
          populate: [{
              path: 'sub_categories',
              populate: [{
                  path: 'products'
                }
              ]
            }
          ]
        }
      ]
    }).exec();

    let mainCategories = [];
    let categories = [];
    let subCategories = [];
    let products = [];

    // Add by default all public cateories , maincateories , suncategories and formula to user 

    publicList.main_categories.forEach(item => {
      mainCategories.push(item._id);
      item.categories.forEach(item1 => {
          categories.push(item1._id);
          item1.sub_categories.forEach(item2 => {
            subCategories.push(item2._id);
            item2.products.forEach(item3 => {
               products.push(item3._id);
            })
          })
      })
    });

    user.mainCategories = mainCategories;
    user.categories = categories;
    user.subCategories = subCategories;
    user.products = products;
    user = await user.save();

    return resp.json({msg: 'Userc successfully registered'});
  } catch(err) {
      console.log(err);
      next(err);
  }

}
