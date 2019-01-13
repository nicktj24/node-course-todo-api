const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/users');
const {ObjectID} = require('mongodb');

// Delete all the documents in todos collection
// Todo.deleteMany({}).then((res) => {
//    console.log(res);
// });

//Todo.findOneAndDelete
// Todo.findByIdAndDelet

// Todo.findOneAndDelete({_id:'5c3acee97a5b708f45451d50'}).then((doc) => {
//   console.log(doc);
// });
//
// Todo.findByIdAndDelete('5c3acee97a5b708f45451d50').then((doc) => {
//   console.log(doc)
// });
