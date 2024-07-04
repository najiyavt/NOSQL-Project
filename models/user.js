const getDb = require('../util/database').getDb;
const mongodb = require('mongodb')

const ObjectId = mongodb.ObjectId;

class User{
  constructor(username , email , cart , id) {
    this.username=username;
    this.email=email;
    this.cart=cart; //{items:[]}
    this._id = id;
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

   addToCart(product){
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp._id === product._id;
    // });
    const updatedCart = { items: [{ productId: new ObjectId(product._id), quantity:1 }] };
    const db = getDb();
    return db.collection('users').updateOne({ _id : new ObjectId(this._id)} , 
    { $set : {cart : updatedCart}}) 
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
