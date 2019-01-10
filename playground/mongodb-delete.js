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

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5c3706540f1b712eaa41e4b3')}, (err, result) => {
    if(err){
      return console.log('Unable to delete', err);
    }
    console.log('Deleted Document', result);
  });

  // db.collection('Users').deleteMany({name:'Ram'}, (err, result) => {
  //   if(err){
  //     return console.log('Unable to delete given document', err);
  //   }
  //   console.log('Deleted Document',result);
  // });

  // db.collection('Todos').deleteOne({text:'Something to do 1'}, (err, res) => {
  //   if(err){
  //     return console.log('Unable to delete');
  //   }
  //   console.log('Deleted Text', JSON.stringify(res, undefined, 2));
  // });
  // db.collection('Todos').deleteOne({completed:false}).then((result)=>{
  //   console.log(result);
  // });
  // db.collection('Todos').findOneAndDelete({text:'Something to do 2'}, (err, result) => {
  //   if(err){
  //     return console.log(err);
  //   }
  //   console.log(result);
  // });
});
