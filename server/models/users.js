const mongoose = require('mongoose');

var Users = mongoose.model('Users', {
  email:{
    type:String,
    required:true,
    min:1,
    trim:true
  },
  password:{
   type:String
  }
});

module.exports = {
  Users
};
