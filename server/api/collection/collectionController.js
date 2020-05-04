var Collection = require('./collectionModel');
var {
  validateCollectionPost
} = require('../../validation/collection/post');
var isEmpty = require('../../validation/isEmpty');
var slugify = require('slug-generator');

module.exports.params = async function (req, resp, next, slug) {
  try {
    let collection = await Collection.findOne({
      slug: slug
    }).exec();
    if (!collection) {
      return resp.status(400).json({
        msg: 'Collection with this email does not exist'
      });
    }
    req.collection = collection;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports.get = async function (req, res, next) {

  try {
    let collection = await Collection.findOne().populate({
      path: 'main_categories',
      select: 'title slug description',
      populate: {
        path: 'categories',
        select: 'title slug description',
        options: {
          limit: 5 
        }
      }
    }).exec();
    return res.json(collection);
  } catch (err) {
    next(err);
  }

}

module.exports.post = async function (req, res, next) {

  try {
    let {
      errors,
      isValid
    } = validateCollectionPost(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let collection = new Collection();
    collection.name = req.body.name;
    collection.slug = slugify(req.body.name);
    collection = await collection.save();

    return res.json(collection);
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
    let collection = req.collection;
    if (req.body.mainCategory) collection.main_categories.push(req.body.mainCategory);

    collection = await collection.save();
    return res.json(collection);
  } catch (err) {
    next(err);
  }
}


module.exports.mainCategory = async function (req, resp, next) {
  try {
    let data = await Collection.findOne().populate({
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
    let data = await Collection.findOne().populate({
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
    let data = await Collection.findOne().populate({
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
