const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const User = require('./../../models/users').Users;
const jwt = require('jsonwebtoken');

var userOneId = new ObjectID();
var userTwoId = new ObjectID();

var users = [
  {
    _id:userOneId,
    email:'nikhilbramha@gmail.com',
    password:'userOnePass',
    tokens:[{
      access:'auth',
      token:jwt.sign({_id:userOneId, access:'auth'}, 'abc123').toString()
    }]
  },
  {
    _id:userTwoId,
    email:'nicktj24@gmail.com',
    password:'userTwoPass'
  }];

var todos = [
  {
    _id : new ObjectID(),
    text:'Go to Gym'
  },
  {
    _id : new ObjectID(),
    text:'Go to Running',
    completed:true,
    completedAt: 333
  }
];

const populateTodos = (done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => { done() });
};

const populateUsers = (done) => {
  User.deleteMany({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => {
    done();
  });
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}
