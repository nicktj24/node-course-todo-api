const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser:true});

module.exports = {
  // mongoose:mongoose Or if both varible name and resource name is same then we can write only resource name as
  // below
  mongoose
}
