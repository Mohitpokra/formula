const mongoose = require('mongoose');
const { dbUrl } = require('../../config/index');

const connect = async () => {
    try {
       let uri = dbUrl;
       await mongoose.connect(uri, { useNewUrlParser: true,  useCreateIndex: true });
       console.log('mongodb Connected......');
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}
module.exports = connect;