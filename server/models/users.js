const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const Schema = mongoose.Schema;

var userSchema = new Schema({
  email:{
    type: String,
    require: true,
    trim: true,
    minlength:1,
    unique:true,
    validate:{
      validator: validator.isEmail,
      message:'{value} is not valid email ID'
    }
  },
  password: {
    type: String,
    minlength:6,
    require:true
  },
  tokens:[{
    access:{
      type:String,
      require:true
    },
    token:{
      type:String,
      require:true
    }
  }]
});

userSchema.methods.toJSON = function(){
  var user = this;
  // user.toObject() is responsible for mongoose variable 'user' and converting it into regular object
  // where only the properties available in the document exists
  var userObj = user.toObject();

  return _.pick(userObj, ['_id','email']); 
}

userSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
};

var Users = mongoose.model('Users', userSchema)

module.exports = {
  Users
};
