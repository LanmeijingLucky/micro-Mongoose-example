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


### Connect with MongoDB serve


```
const mongoose  = require('mongoose');
const url = `mongodb://localhost:27017/mean`

const connectWithDB = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(url, {useMongoClient: true})
}

module.exports = connectWithDB;

```


### Micro Service


```
const { send, json } = require('micro')
const { router, get, post, del, options } = require('microrouter');

const Log = require('./model/data.js');
const connectWithDB = require('./db');

connectWithDB();

const notfound = (req, res) => {
  send(res, 404, 'Not found route')
}


const label = 'log';
const create = async (req, res) => {
  let data = await json(req)
  let lamp = new Log(data);
  console.log('create-Log---', req.query, data )
  lamp.save();
  send(res, 200,  {msg: 'create-ok'})
}

const findDatas = async (req, res) => {
  const datas = await Log.find({})
  send(res, 200, datas);
}
const findDatasByTime = async (req, res) => {
  let data = await json(req);
  const p = {'time': {'$gte': data.startTime, '$lt': data.endTime }};
  const datas = await Log.find(p);
  send(res, 200, datas);
}

module.exports = router(
  get('/loglist', findDatas),
  post('/logcreate', create),
  post('/loglist', findDatasByTime),
  get('/*', notfound),
)

```