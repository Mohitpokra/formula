var Public = require('./publicModel');
var {
  validPublicPost
} = require('../../validation/public/post');
var isEmpty = require('../../validation/isEmpty');
var slugify = require('slug-generator');

module.exports.params = async function (req, resp, next, slug) {
  try {
    let public = await Public.findOne({
      slug: slug
    }).exec();
    if (!public) {
      return resp.status(400).json({
        msg: 'Public with this email does not exist'
      });
    }
    req.public = public;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports.getNexted = async function (req, resp, next) {
  try {
    let mainCategories = await Public.findOne({}).populate({
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
    resp.json(mainCategories);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports.get = async function (req, res, next) {

  try {
    let public = await Public.findOne().populate('main_categories', '_id title slug description').exec();
    return res.json(public);
  } catch (err) {
    next(err);
  }

}

module.exports.post = async function (req, res, next) {

  try {
    let {
      errors,
      isValid
    } = validPublicPost(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let public = new Public();
    public.name = req.body.name;
    public.slug = slugify(req.body.name);
    public = await public.save();

    return res.json(public);
  } catch (err) {
    next(err);
  }

}

/**
 * push main, sub, category, porduct only single not in bulk
 */

module.exports.put = async function (req, res, next) {

  req.body.mainCategory = isEmpty(req.body.mainCategory) ? "" : req.body.mainCategory;

  try {
    let public = req.public;
    if (req.body.mainCategory) public.main_categories.push(req.body.mainCategory);

    public = await public.save();
    return res.json(public);
  } catch (err) {
    next(err);
  }
}


module.exports.mainCategory = async function (req, resp, next) {
  try {
    let data = await Public.findOne().populate({
      path: 'main_categories',
      select: "slug title description",
      match: {
        slug: {
          $eq: req.params.mainCategory
        }
      },
      populate: {
        path: 'categories',
        select: "slug title description",
      }
    })

    if (!data || !data.main_categories || !data.main_categories.length) {
      return resp.status(404).json({
        msg: 'Not Found'
      });
    }

    return resp.json(data.main_categories[0]);

  } catch (err) {
    next(err);
  }
}

module.exports.categoryInMainCategory = async function (req, resp, next) {
  try {
    let data = await Public.findOne().populate({
      path: 'main_categories',
      select: "slug title description",
      match: {
        slug: {
          $eq: req.params.mainCategory
        }
      },
      populate: {
        path: 'categories',
        select: "slug title description",
        match: {
          slug: {
            $eq: req.params.category
          }
        },
        options: {
          limit: 1
        },
        populate: {
          path: 'sub_categories',
          select: "slug title description",
        }
      }
    })

    if (!data || !data.main_categories || !data.main_categories.length || !data.main_categories[0].categories || !data.main_categories[0].categories.length) {
      return resp.status(404).json({
        msg: 'Not found'
      })
    }

    return resp.json(data.main_categories[0].categories[0]);

  } catch (err) {

  }
}

module.exports.subCategoryInMainCategory = async function (req, resp, next) {
  try {
    console.log("here");
    let data = await Public.findOne().populate({
      path: 'main_categories',
      select: "slug",
      match: {
        slug: {
          $eq: req.params.mainCategory
        }
      },
      populate: {
        path: 'categories',
        select: "slug",
        match: {
          slug: {
            $eq: req.params.category
          }
        },
        populate: {
          path: 'sub_categories',
          select: "title description",
          match: {
            slug: {
              $eq: req.params.subCategory
            }
          },
          populate: {
            path: 'products',
            select: 'title equation description'
          }
        }
      }
    });


    if (!data || !data.main_categories || !data.main_categories.length || !data.main_categories[0].categories || !data.main_categories[0].categories.length || !data.main_categories[0].categories[0].sub_categories || !data.main_categories[0].categories[0].sub_categories.length) {
      return resp.status(404).json({
        msg: 'Not found'
      })
    }

    return resp.json(data.main_categories[0].categories[0].sub_categories[0]);

  } catch (err) {

  }
}


module.exports.delete = function (req, res, next) {

}
