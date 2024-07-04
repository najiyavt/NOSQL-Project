const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config();

let _db ;

const host = process.env.MONGODB_HOST ;
const port = process.env.MONGODB_PORT ;
const dbName = process.env.MONGODB_DB ;

const uri = `mongodb://${host}:${port}/${dbName}`;

const mongoConnect = callback => {
  MongoClient.connect(uri)
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if(_db){
    return _db;
  }
  throw 'No database found!';
}

module.exports = { mongoConnect , getDb };
