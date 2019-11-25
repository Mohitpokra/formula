var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

let publicSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    slug: {
        type: String,
        required: true,
    },
    main_categories: [{
        type: Schema.Types.ObjectId,
        ref: 'main_category'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('public', publicSchema);