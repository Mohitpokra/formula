const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {capatalize} = require('../commonModelMethod');

let productSchema = new Schema({
  title: {
    type: String,
    required: true,
    set: capatalize
  },
  slug: {
    type: String,
    required: true
  },
  description: {
    type: String,
    set: capatalize
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
