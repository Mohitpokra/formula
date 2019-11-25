const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  capatalize
} = require('../commonModelMethod');

let subCategorySchema = new Schema({
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
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'product'
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'image'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('sub_category', subCategorySchema);
