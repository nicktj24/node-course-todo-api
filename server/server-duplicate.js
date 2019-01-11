var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser:true});
// Creating Mongoose Model 2
var Users = mongoose.model('Users', {
  email:{
    type:String,
    min:1,
    required:true,
    trim:true
  },
  password:{
    type:String,
    default:null
  }
});

var newUser = new Users({
  email:'nicttj24@gmail.com'
});

newUser.save().then((res)=>{
  console.log(JSON.stringify(res, undefined, 2));
})

//Creating Mongoose Model 1
var Todo = mongoose.model('Todo', {
  text : {
    type: String,
    min: 1,
    required:true,
    trim:true
  },
  completed : {
    type: Boolean,
    default:false
  },
  completedAt : {
    type: Number,
    default:null
  }
});

var otherTodo = new Todo({
  text: 'Go to the Gym',
});

otherTodo.save().then((res) => {
  console.log('Save 2nd Todo', '\n' + JSON.stringify(res, undefined, 2) );
}).catch((e) => {
  console.log(e);
});
// var newTodo = new Todo(
//   {
//     text:'Eat Lunch at 4pm'
//   }
// );
//
// newTodo.save().then((res) => {
//   console.log('Saved Todo', JSON.stringify(res, undefined,2));
// }, (err) => {
//   console.log('Unable to save',err);
// });
