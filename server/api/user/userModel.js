const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    mainCategories: [{
        type: Schema.Types.ObjectId,
        ref: 'main_category'  
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],
    subCategories:[{
        type: Schema.Types.ObjectId,
        ref: 'sub_category'
    }],
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }], 
    collections: {
        type: Schema.Types.ObjectId,
        ref:  'collection'
    }
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password')) return next();
    this.password = this.encryptPassword(this.password);
    next();
})

userSchema.methods = {
     // check the passwords on signin
    authenticate: function(plainTextPassword) {
        return bcrypt.compareSync(plainTextPassword, this.password);
    },
    // hash the passwords
    encryptPassword: function(plainTextPassword) {
        if(!plainTextPassword) {
            return '';
        } else {
            var salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainTextPassword, salt);
        }
    }
 };

module.exports = mongoose.model('user', userSchema);

