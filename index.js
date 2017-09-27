const { send, json } = require('micro')
const { router, get, post, del, options } = require('microrouter');

const mongoose  = require('mongoose');

const Log = require('./data.js');
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
