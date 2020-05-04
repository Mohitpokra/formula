var validator = require('validator');
var isEmpty = require('../isEmpty');
var User = require('../../api/user/userModel')

module.exports.validateSingUp = (data) => {
    let errors = {};

    data.name = isEmpty(data.name) ? '' : data.name;
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;
    data.phone = isEmpty(data.phone) ? '' : data.phone;
    data.confirmPassword = isEmpty(data.confirmPassword) ? '' : data.confirmPassword;

    if(!validator.isEmail(data.email)) errors.email = "kindly enter right email address";
    if(validator.isEmpty(data.email)) errors.email = "kindly enter email address";
    if(validator.isEmpty(data.name)) errors.name = "kindly enter name field";
    if(validator.isEmpty(data.password)) errors.password = "kindly enter password field";
    if(validator.isEmpty(data.confirmPassword)) errors.confirmPassword = "kindly enter confirm password field";
    if(!validator.isMobilePhone(data.phone, 'en-IN')) errors.phone = "kindly enter correct phone number";
    console.log(validator.isMobilePhone(data.phone, 'en-IN'));
    if(data.password != data.confirmPassword) errors.confirmPassword = "password doens't macth with confirm password";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}