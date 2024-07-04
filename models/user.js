const getDb = require('../util/database').getDb;
const mongodb = require('mongodb')

class User{
  constructor(username , email) {
    this.username=username;
    this.email=email;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  }

  
  static findById(userId){
    const db = getDb();
    return db.collection('users').findOne({ _id : new mongodb.ObjectId(userId)})
    .then(users => {
      console.log(users);
      return users;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
  }
}

module.exports = User;
