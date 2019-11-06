const MainCategory = require('./mainCategoryModel');
let {
  validateMainCategoryPost
} = require('../../validation/mainCategory/post');


module.exports.get = async function (req, resp, next) {
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
    mainCategory.description = req.body.description;
    mainCategory = await mainCategory.save();
    resp.json(mainCategory);
  } catch (err) {
    console.log(err.message);
    next(err);
  }

}
