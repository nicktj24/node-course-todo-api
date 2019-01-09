const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser:true }, (err, client) => {
  if(err){
    console.log('Unable to connect mongo server', err);
  }
  const db = client.db('TodoApp')

  db.collection('Todos').find().count().then((count) => {
    console.log('Count of Docs in Todos collection', count);
  }, (err) => {
    if(err){
     console.log('Unable to count objects', err);
    }
  });

  // Fetch Data from collection
  // db.collection('Todos').find({completed:false}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch data', err);
  // });

});
