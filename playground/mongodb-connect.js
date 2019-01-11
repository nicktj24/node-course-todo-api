// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //This is a Object Destructuring feature of ES6

var ObjId = new ObjectID();
console.log(ObjId);


MongoClient.connect('mongodb://localhost:27017/TodoApp1',{ useNewUrlParser: true }, (err, client) => {
  if(err){
    // Return function from here to avoid execute statements outside the function
    return console.log('Unable to connect to MongoDB server', err);
  }
  console.log('Successfully connected to the MongoDB server');
  const db = client.db('TodoApp');

  // Insert a collection
  // db.collection('Todos').insertOne({
  //   text:'Something to do',
  //   completed:false
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert to do', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name:'Ram',
  //   age:25,
  //   location:'Chandrapur'
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert users data', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined,2));
  // });
  db.collection('Todos').insertOne({text:'Eat Lunch at 2pm', completed:false}).then((result) => {
    console.log(result.ops);
  });

  client.close();
});
