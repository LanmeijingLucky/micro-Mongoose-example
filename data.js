const mongoose  = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


Date.prototype.format =function(format)
{
  var o = {
    'M+' : this.getMonth()+1, //month
    'd+' : this.getDate(), //day
    'h+' : this.getHours(), //hour
    'm+' : this.getMinutes(), //minute
    's+' : this.getSeconds(), //second
    'q+' : Math.floor((this.getMonth()+3)/3), //quarter
    'S' : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
                                                (this.getFullYear()+'').substr(4- RegExp.$1.length));
  for(var k in o)if(new RegExp('('+ k +')').test(format))
  format = format.replace(RegExp.$1,
                          RegExp.$1.length==1? o[k] :
                          ('00'+ o[k]).substr((''+ o[k]).length));
  return format;
};

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
    default: (new Date()).format('yyyy-MM-dd hh:mm:ss'),
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
