const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {capatalize} = require('../commonModelMethod');

let mainCategorySchema = new Schema({
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
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'category'
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('main_category', mainCategorySchema);
