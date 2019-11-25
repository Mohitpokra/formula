var router = require('express').Router();
var collectionController = require('./collectionController');

router.param('slug', collectionController.params);

router.route('/')
  .get(collectionController.get)
  .post(collectionController.post);

router.route("/:slug")
  .put(collectionController.put);


router.route('/category/:mainCategory/:category')
  .get(collectionController.categoryInMainCategory);

router.route('/sub_category/:mainCategory/:category/:subCategory')
  .get(collectionController.subCategoryInMainCategory);

router.route('/main_category/:mainCategory').get(collectionController.mainCategory);

module.exports = router;
