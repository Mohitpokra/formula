const validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports.validateProductPost = (data) => {

    let errors = {};

    data.equation = isEmpty(data.equation) ? '' : data.equation;
    data.subCategory = isEmpty(data.subCategory) ? '' : data.subCategory;

    if(validator.isEmpty(data.equation)) errors.equation = "Kindly Enter the value in formula";
    if(validator.isEmpty(data.subCategory)) errors.subCategory = "Kindly select subCategory";

    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}