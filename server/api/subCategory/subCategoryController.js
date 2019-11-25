const SubCategory = require('./subCategoryModel');
let { validateSubCategoryPost } = require('../../validation/subCategory/post');
let Category = require('../category/categoryModel');
const slugify = require('slug-generator');

module.exports.params = async function(req, resp, next, slug) {
   try {
      let subCategory = await SubCategory.findOne({slug: slug}).populate({
        path: 'products',
        select: '_id title description equation image'
      }).select('_id description title').exec();

      if(!subCategory) {
        return resp.status(404).json({msg: "Not found"});
      }

      req.subCategory = subCategory;
      next();
   } catch(err) {

   }
}

module.exports.get = async function (req, resp, next) {
  try {
    let subCategories = await SubCategory.find({}).exec();
    resp.json(subCategories);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports.getOne = function(req, resp, next) {
  return resp.json(req.subCategory);
}

module.exports.post = async function (req, resp, next) {
  
  const {errors, isValid} = validateSubCategoryPost(req.body);

  if(!isValid) {
      return resp.status(400).json(errors);
  }

  try {
    let subCategory = new SubCategory();
    subCategory.title = req.body.title;
    subCategory.slug = slugify(req.body.title);
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
