const router = require('express').Router();
const publicController = require('./publicController');

router.param('slug', publicController.params);

router.route('/')
  .get(publicController.get)
  .post(publicController.post);

router.route("/:slug")
  .put(publicController.put);

router.route('/category/:mainCategory/:category')
  .get(publicController.categoryInMainCategory);

router.route('/sub_category/:mainCategory/:category/:subCategory')
  .get(publicController.subCategoryInMainCategory);

router.route('/main_category/:mainCategory').get(publicController.mainCategory);
router.get('/nexted', publicController.getNexted);

module.exports = router;
