const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mainCategorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'category'
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('main_category', mainCategorySchema);
