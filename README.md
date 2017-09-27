# Micro-Mongoose-example

### install packages

```
$ npm install micro micro-dev microrouter mongoose --save

```

Using Mongoose to verify the data, and save to the MongoDB.


### Verify data


```
const mongoose  = require('mongoose');

var Schema = mongoose.Schema;

const LogSchema = new Schema({
  name: {
    type: String,
    required: 'Please fill Alarm name',
    trim: true
  },
  time: {
    type: String,
  },
  type: {
    type: String,
  },
  status: {
    type: String,
  },
  tag: {
    type: String,
  },
  handleTime: {
    type: String,
  },
  handler: {
    type: String,
    default: 'SCM',
  },
  description: {
    type: String,
    default: 'SystemLog'
  },
});

const initColl = () => {
  if(mongoose.models.Log) {
    return mongoose.model('Log')
  }
  else {
    return mongoose.model('Log', LogSchema);
  }
}
module.exports = initColl();

```