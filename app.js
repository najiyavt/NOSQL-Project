const path = require('path');
const dotenv = require('dotenv');
dotenv.config(); 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById("6687b64da4e3f3c49d812aa3")
//     .then(user => {
//       req.user = new User(user.name , user.email , user.cart , user._id);
//       next();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
.then(result => {
  app.listen(3000);
})
.catch(err => {
  console.log(err);
})