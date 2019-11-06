const validator = require('validator');
const isEmpty = require('../../validation/isEmpty');

module.exports.validateMainCategoryPost = (data) => {
    let errors = {};
    data.title = isEmpty(data.title) ? '' : data.title;

    if(validator.isEmpty(data.title)) errors.title = "Main Category title is required";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}