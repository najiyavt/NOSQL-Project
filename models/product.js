const getDb = require('../util/database').getDb;
const mongodb = require('mongodb')

class Product {
  constructor(title , imageUrl , price , description ) {
    this.title=title;
    this.price=price;
    this.imageUrl=imageUrl;
    this.description=description;
  }

  save() {
    const db = getDb();
    return db.collection('products').insertOne(this)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  }

  static fetchAll(){
    const db = getDb();
    return db.collection('products').find().toArray()
    .then(products => {
      console.log(products);
      return products;
    })
    .catch(err => {
      console.log(err);
    });
  }

  static findById(prodId){
    const db = getDb();
    if (!mongodb.ObjectId.isValid(prodId)) {
      return Promise.reject(new Error('Invalid ID format'));
    }

    return db.collection('products').findOne({ _id : new mongodb.ObjectId(prodId)})
    .then(products => {
      console.log(products);
      return products;
    })
    .catch(err => {
      console.log(err);
    });
  }
}

module.exports = Product;
