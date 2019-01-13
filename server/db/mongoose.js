const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true});

module.exports = {
  // mongoose:mongoose Or if both varible name and resource name is same then we can write only resource name as
  // below
  mongoose
}

// Solution But i don't understand why above line throwing a code
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/TodoAppTest' , {useNewUrlParser:true});
