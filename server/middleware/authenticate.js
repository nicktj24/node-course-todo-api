const User = require('./../models/users').Users;

var authenticate = (req, res, next) => {
    // we mention 'x-auth' value at the time of get request
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if(!user){
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send(e);
  });

}

module.exports = {
  authenticate
}
