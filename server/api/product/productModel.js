const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String
  },
  equation: {
    type: String,
    required: true
  },
  sub_category: {
    type: Schema.Types.ObjectId,
    ref: 'sub_category',
    required: true
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: 'image'
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('product', productSchema);
