const validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports.validPublicPost = (data) => {

    let errors = {};

    data.name = isEmpty(data.name) ? '' : data.name;

    if(validator.isEmpty(data.name)) errors.name = "Kindly Enter public name";

    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}