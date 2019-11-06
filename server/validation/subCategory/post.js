const validator = require('validator');
const isEmpty = require('../../validation/isEmpty');

module.exports.validateSubCategoryPost = (data) => {
    let errors = {};
    data.title = isEmpty(data.title) ? '' : data.title;
    data.category= isEmpty(data.category) ? '' : data.category;

    if(validator.isEmpty(data.title)) errors.title = "Category title is required";
    if(validator.isEmpty(data.category)) errors.category = "Kindly select category field";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}