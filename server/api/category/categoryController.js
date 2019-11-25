const Category = require('./categoryModel');
let { validateCategoryPost } = require('../../validation/category/post');
const slugify = require('slug-generator');
let MainCategory = require('../mainCategory/mainCategoryModel');

module.exports.params = async function(req, res, next, slug) {
   try {
    let category = await Category.findOne({slug: slug}).populate({
      path: 'sub_categories',
      select: 'title slug description image'
    }).select('title slug description image').exec();
    req.category = category;
    next();
   } catch (err) {
       next(err);
   }
}

module.exports.get = async function (req, resp, next) {
  try {
    let categories = await Category.find({}).populate({
      path: 'sub_categories',
      select: 'title slug description products, image'
    }).select('title slug description image').exec();
    resp.json(categories);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports.getOne = function(req, resp, next) {
  return resp.json(req.category);
}

module.exports.post = async function (req, resp, next) {
  
  const {errors, isValid} = validateCategoryPost(req.body);

  if(!isValid) {
      return resp.status(400).json(errors);
  }

  try {
    let category = new Category();
    category.title = req.body.title;
    category.slug = slugify(req.body.title);
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
