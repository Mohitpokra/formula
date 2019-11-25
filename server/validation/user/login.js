const validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports.validateLogin = (data) => {
    let errors = {};
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;

    if(!validator.isEmail(data.email)) errors.email = "Kindly enter right email address";
    if(validator.isEmpty(data.email)) errors.email = "Kindly enter email address";
    if(validator.isEmpty(data.password)) errors.password= "Kindly enter password";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}