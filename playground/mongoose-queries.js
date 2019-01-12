const {mongoose} = require('./../server/db/mongoose');
const {ObjectId} = require('mongodb');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/users');

var id ='5c39aed277f5de41e435e3bb';
var uid = '5c378c370c4ab318e0d7ba29';
if(!ObjectId.isValid(id)){
  console.log('Id is not valid');
}

// Todo.find({_id:id}).then((todos) => {
//   console.log(todos);
// }).catch((e) => {console.log(e)});
//
// Todo.findOne({_id:id}).then((todo) => {
//   console.log(todo);
// },(e) => {
//   console.log(e);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     console.log('ID not found.');
//   }
// }, (e) => {
//   console.log(e);
// } );

Users.findById(uid).then((user) => {
  if(!user){
    console.log('User not found');
  }
  console.log(user);
}).catch((e) => {
  console.log(e);
});
