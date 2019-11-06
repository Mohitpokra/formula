const SubCategory = require('./subCategoryModel');
let { validateSubCategoryPost } = require('../../validation/subCategory/post');
let Category = require('../category/categoryModel');


module.exports.get = async function (req, resp, next) {
  try {
    let subCategories = await SubCategory.find({}).populate('products').populate('category').exec();
    resp.json(subCategories);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports.post = async function (req, resp, next) {
  
  const {errors, isValid} = validateSubCategoryPost(req.body);

  if(!isValid) {
      return resp.status(400).json(errors);
  }

  try {
    let subCategory = new SubCategory();
    subCategory.title = req.body.title;
    subCategory.description = req.body.description;
    subCategory.category = req.body.category;
    subCategory = await subCategory.save();

    let category = await Category.findById(req.body.category).exec();
    category.sub_categories.push(subCategory._id);
    category = await category.save();
    resp.json(subCategory);
  } catch (err) {
    console.log(err.message);
    next(err);
  }

}
