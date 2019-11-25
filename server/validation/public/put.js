const validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports.validPublicPut = (data) => {

    let errors = {};

    data.mainCategories = isEmpty(data.mainCategory) ? [] : data.mainCategory;
    data.subCategories = isEmpty(data.subCategories) ? [] : data.subCategories;
    data.categories = isEmpty(data.categories) ? [] : data.categories;
    data.products = isEmpty(data.products) ? [] : data.products;
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}