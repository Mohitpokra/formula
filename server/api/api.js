const router = require('express').Router();

router.use('/category', require('./category/categoryRoute'));
router.use('/product', require('./product/productRoute'));
router.use('/main_category', require('./mainCategory/mainCategoryRoute'));
router.use('/sub_category', require('./subCategory/subCategoryRoute'));
router.use('/user', require('./user/userRoute'));
router.use('/auth', require('./auth/authRoute'));
router.use('/public', require('./public/publicRoute'));
router.use('/collection', require('./collection/collecionRoute'));

module.exports = router;