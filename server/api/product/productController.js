let Product = require('./productModel');
let SubCategory = require('../subCategory/subCategoryModel');
let { validateProductPost } = require('../../validation/product/post');
const slugify = require('slug-generator');

module.exports.get = async function (req, resp, next) {

  try {
    let product = await Product.find({}).exec();
    resp.json(product);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports.post = async function (req, resp, next) {
  let {
    errors,
    isValid
  } = validateProductPost(req.body);

  if (!isValid) {
    return resp.status(400).json(errors);
  }

  try {
    let product = new Product();
    product.title = req.body.title;
    product.slug = slugify(req.body.title);
    product.description = req.body.description;
    product.equation = req.body.equation;
    product.sub_category = req.body.subCategory;
    product = await product.save();

    let subCategory = await SubCategory.findById(req.body.subCategory).exec();
    subCategory.products.push(product._id);
    await subCategory.save();
    resp.json(product);

  } catch (err) {
    console.log(err);
    next(err);
  }
}
