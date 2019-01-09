const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';

var dbName = 'TodoApp';

// Create new MongoClient()
const client = new MongoClient(url, { useNewUrlParser:true });

// Use connect method to connect the server

client.connect((err, client)=> {
  if(err){
    return console.log('Unable to connect to mongodb server',err);
  }
  const db = client.db('TodoApp');

  db.collection('Todos').find().toArray().then((res) => {
    console.log(JSON.stringify(res, undefined,2))
  }, (err) => {
    console.log('Unable to fetch data', err);
  });

  // client.close();
});
