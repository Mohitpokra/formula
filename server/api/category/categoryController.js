const Category = require('./categoryModel');
let { validateCategoryPost } = require('../../validation/category/post');
let MainCategory = require('../mainCategory/mainCategoryModel');


module.exports.get = async function (req, resp, next) {
  try {
    let categories = await Category.find({}).populate('main_category').populate('sub_categories').exec();
    resp.json(categories);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports.post = async function (req, resp, next) {
  
  const {errors, isValid} = validateCategoryPost(req.body);

  if(!isValid) {
      return resp.status(400).json(errors);
  }

  try {
    let category = new Category();
    category.title = req.body.title;
    category.description = req.body.description;
    category.main_category = req.body.mainCategory;
    category = await category.save();

    let mainCategory = await MainCategory.findById(req.body.mainCategory).exec();
    mainCategory.categories.push(category._id);
    mainCategory = await mainCategory.save();
    resp.json(category);
  } catch (err) {
    console.log(err.message);
    next(err);
  }

}
