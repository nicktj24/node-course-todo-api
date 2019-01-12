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
      res.status(400).send();
    }
    res.send({todo});
  }, (e) => {
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
