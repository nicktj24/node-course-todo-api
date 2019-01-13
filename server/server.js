var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppTest';
}

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// const {mongoose} = require('./db/mongoose.js'); OR
const mongoose = require('./db/mongoose.js').mongoose;
var Todo = require('./models/todo.js').Todo;
var User = require('./models/users.js').Users;

var app = express();
let PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
  var todo = new Todo({
    text:req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(400).send();
    }
    res.send({todo});
  }, (e) => {
    res.status(400).send(e);
  });
});


app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;
  if(! ObjectID.isValid(id) ){
    return res.status(404).send();
  }
  Todo.findByIdAndDelete(id).then((todo) => {
    if(!todo){
       return res.status(404).send('Not Found particular todo');
    }
    // res.send({todo:todo}); //As both name are same we write below statement
    res.send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send('ObjectID is invalid');
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

   Todo.findByIdAndUpdate(id, {$set : body},{new : true}).then((todo) => {
     if(!todo){
       return res.status(404).send('Not Found !');
     }
     res.send({todo});
   }).catch((e) => {
     res.status(400).send(e);
   });

});

app.listen(PORT, () => {
  console.log('Server listening at port : 3000' );
});

// for testing purpose we export variable app
module.exports ={
  app
};
