const validator = require('validator');
const isEmpty = require('../../validation/isEmpty');

module.exports.validFeebackPost = (data) => {
    let errors = {};
    data.name = isEmpty(data.name) ? '' : data.name;
    data.phone = isEmpty(data.phone) ? '' : data.phone;
    data.feedback = isEmpty(data.feedback) ? '' : data.feedback;

    if(validator.isEmpty(data.name)) errors.name = "Name field is required";
    if(!validator.isLength(data.phone, {min: 10, max: 10})) errors.phone = "Phone Number should be of 10 digit";
    if(!validator.isNumeric(data.phone)) errors.phone = "Phone field must be numeric";
    if(validator.isEmpty(data.phone)) errors.phone = "Phone field is required";
    if(validator.isEmpty(data.feedback)) errors.feedback = "Feedback field is required";

    return {
        errors,
        isValid: isEmpty(errors)
    }

}