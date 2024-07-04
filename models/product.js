const getDb = require('../util/database').getDb;
const mongoDb = require('mongodb')

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
    return db.collection('products').find({ _id : new mongoDb.ObjectId(prodId)}).next()
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
