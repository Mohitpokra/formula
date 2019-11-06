const mongoose = require('mongoose');

const connect = async () => {
    try {
       await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true,  useCreateIndex: true });
       console.log('mongodb Connected......');
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}
module.exports = connect;