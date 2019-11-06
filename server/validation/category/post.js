const validator = require('validator');
const isEmpty = require('../../validation/isEmpty');

module.exports.validateCategoryPost = (data) => {
    let errors = {};
    data.title = isEmpty(data.title) ? '' : data.title;
    data.mainCategory = isEmpty(data.mainCategory) ? '' : data.mainCategory;

    if(validator.isEmpty(data.title)) errors.title = "Category title is required";
    if(validator.isEmpty(data.mainCategory)) errors.mainCategory = "Kindly select main category field";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}