const validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports.validateCollectionPost = (data) => {

  let errors = {};
  
  data.name = isEmpty(data.name) ? '' : data.name;

  if (validator.isEmpty(data.name)) errors.name = "Kindly provide the name of the collection";

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
