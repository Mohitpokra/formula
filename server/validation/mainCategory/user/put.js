const validator = require('validator');
const isEmpty = require('../../isEmpty');

module.exports.validateUsersMainCategoryEditData = (data) => {
    let errors = {};
    data.title = isEmpty(data.title) ? '' : data.title;

    if(validator.isEmpty(data.title)) errors.title = "Main Category title is required";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}