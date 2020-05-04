const MainCategory = require('./mainCategoryModel');
const User = require('../user/userModel');
const slugify = require('slug-generator');
const {
  capatalize
} = require('../commonModelMethod');
const {
  validateUsersMainCategoryData
} = require('../../validation/mainCategory/user/post');
const {
  validateUsersMainCategoryEditData
} = require('../../validation/mainCategory/user/put');


module.exports.get = async function (req, resp, next) {
  return resp.json({
    msg: "I am heree"
  });
}

module.exports.post = async function (req, resp, next) {
  const {
    errors,
    isValid
  } = validateUsersMainCategoryData(req.body);

  if (!isValid) {
    return resp.status(400).json(errors);
  }

  try {

    let result = await User.findById(req.user._id).populate('mainCategories', 'slug').exec();
    result.mainCategories.forEach(element => {
      if (element.slug === slugify(capatalize(req.body.title))) {
        return resp.status(400).json({
          msg: "This title already exists, kindly add another one"
        });
      }
    });

    let mainCategory = new MainCategory();
    mainCategory.title = req.body.title;
    mainCategory.slug = slugify(req.body.title);
    mainCategory.description = req.body.description;
    mainCategory = await mainCategory.save();

    req.user.mainCategories = [mainCategory._id, ...req.user.mainCategories];
    req.user = await req.user.save();

    return resp.json({
      msg: 'Succesfully added'
    });

  } catch (err) {
    console.log(err.message);
    next(err);
  }

}

module.exports.put= async function (req, resp, next) {
  const {
    errors,
    isValid
  } = validateUsersMainCategoryEditData(req.body);

  if (!isValid) {
    return resp.status(400).json(errors);
  }

  try {

    let mainCategory = await MainCategory.findById(req.params._id).exec();
    if(!mainCategory) {
      return resp.status(400).json({msg: 'Not found'});
    }
    mainCategory.title = req.body.title;
    mainCategory.slug = slugify(req.body.title);
    mainCategory.description = req.body.description;
    mainCategory = await mainCategory.save();

    return resp.json({
      msg: 'Succesfully updated'
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports.delete = async function (req, resp, next) {

  try {

    let mainCategory = await MainCategory.findByIdAndDelete(req.params._id).exec();

    if(mainCategory) {
      return resp.json({
        msg: 'Succesfully updated'
      });
    } else {
      return resp.json({
        msg: 'Not found'
      });
    }

  } catch (err) {
    console.log(err.message);
    next(err);
  }
  
}
