const MainCategory = require('./mainCategoryModel');
const slugify = require('slug-generator');
const {
  validateMainCategoryPost
} = require('../../validation/mainCategory/post');

module.exports.params = async function (req, resp, next, slug) {
  try {
    let mainCategory = await MainCategory.findOne({
      slug: slug
    }).populate({
      path: 'categories',
      select: "title slug description"
    }).exec();

    if (!mainCategory) {
      return resp.status(404).json({
        msg: "Not found"
      });
    }

    req.mainCategory = mainCategory;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports.getNexted = async function (req, resp, next) {
  try {
    let mainCategories = await MainCategory.find({}).populate([{
        path: 'categories',
        populate: [{
            path: 'sub_categories',
            populate: [{
                path: 'products'
              },
              {
                path: 'products',
                populate: 'sub_category'
              }
            ]
          },
          {
            path: 'sub_categories',
            populate: 'category'
          }
        ]
      },
      {
        path: 'categories',
        populate: {
          path: 'main_category'
        }
      }
    ]).exec();
    resp.json(mainCategories);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

/**
 * Only get Maincategory
 */

module.exports.get = async function (req, resp, next) {
  try {
    let mainCategories = await MainCategory.find({}).exec();
    resp.json(mainCategories);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports.getOne = function(req, resp , next) {
  return resp.json(req.mainCategory);
}

/**
 * Only post Categories
 */

module.exports.post = async function (req, resp, next) {

  const {
    errors,
    isValid
  } = validateMainCategoryPost(req.body);

  if (!isValid) {
    return resp.status(400).json(errors);
  }

  try {
    let mainCategory = new MainCategory();
    mainCategory.title = req.body.title;
    mainCategory.slug = slugify(req.body.title);
    mainCategory.description = req.body.description;
    mainCategory = await mainCategory.save();
    resp.json(mainCategory);
  } catch (err) {
    console.log(err.message);
    next(err);
  }

}

