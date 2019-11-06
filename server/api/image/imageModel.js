const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('image', imageSchema);
