// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

var url = 'mongodb://localhost:27017';
var dbName = 'TodoApp';

const client = new MongoClient(url, {useNewUrlParser:true});

client.connect((err, client) => {
  if(err){
    return console.log('Unable to connect mongodb server', err);
  }
  console.log('Successfully connected to mongodb server');
  const db = client.db(dbName);

  db.collection('Users').findOneAndUpdate({name:'Rahul'},{
$set:{ name : 'BC_Rahul'}, $inc:{age: +36 } },
{ returnOriginal:false}).then((result) => {
  console.log(result);
});

});
