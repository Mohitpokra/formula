const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {capatalize} = require('../commonModelMethod');

let categorySchema = new Schema({
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
  sub_categories: [{
    type: Schema.Types.ObjectId,
    ref: 'sub_category'
  }],
  main_category: {
      type: Schema.Types.ObjectId,
      ref: 'main_category',
      required: true
  },
  image: {
      type: Schema.Types.ObjectId,
      ref: 'image'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('category', categorySchema);
