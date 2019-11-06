const mongoose = require('mongoose');

const connect = async () => {
    try {
       await mongoose.connect('mongodb+srv://mgpokra:Mongo@27607@cluster0-dqzy6.mongodb.net/formula?retryWrites=true&w=majority', { useNewUrlParser: true,  useCreateIndex: true });
       console.log('mongodb Connected......');
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}
module.exports = connect;