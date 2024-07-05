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

const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("668804462ecb91fd46980f71")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
.then(result => {
  User.findOne().then(user => {
    if(!user){
      const user = new User({
        name: "Najiya",
        email:"najiya@gmail.com",
        cart: {
          items: []
        }
      });
      user.save();
    }
  })
  app.listen(3000);
})
.catch(err => {
  console.log(err);
})