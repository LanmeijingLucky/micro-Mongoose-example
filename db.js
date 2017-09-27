const mongoose  = require('mongoose');
const url = `mongodb://localhost:27017/mean`

const connectWithDB = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(url, {useMongoClient: true})
}

module.exports = connectWithDB;
