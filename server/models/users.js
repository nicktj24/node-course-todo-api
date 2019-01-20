const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

userSchema.statics.findByToken = function (token){
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
     // return new Promise((resolve, reject) => {
     //   reject();
     // }); //OR
     return Promise.reject();
  }

 // Returning matching object with specified value
  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });

};

// Mongoose middleware
// Pre method run some code before the specified event happen in Server.js file.
// below code run before 'save' event i.e. before saving the document in database
userSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var Users = mongoose.model('Users', userSchema);

module.exports = {
  Users
};
