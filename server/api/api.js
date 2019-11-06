const router = require('express').Router();

router.use('/category', require('./category/categoryRoute'));
router.use('/product', require('./product/productRoute'));
router.use('/main-category', require('./mainCategory/mainCategoryRoute'))
router.use('/sub-category', require('./subCategory/subCategoryRoute'))

module.exports = router;