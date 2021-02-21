const User = require('./schema.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DrinkBot', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

function initDB() {
  db.on('error', console.error.bind(console, 'Connection error'));
  db.once('open', function() {
    console.log('Database is connected');
  });
}


async function addDrink(user, drink) {
  await User.findById({ _id: user.id }, async function(err, doc) {
    if (err) {
      console.log(err);
    }

    if (!doc) {// user does not exist: add user
      const userDocument = new User({ _id: user.id, name: user.displayName, drinks: [drink] });

      userDocument.save(function(err) {
        if (err) return console.error(err);});
    }

    else { // user exists: add the drink to user's drinks array
      doc.drinks.push(drink);
      doc.name = user.displayName // update name in case user has changed nickname since last added drink

      doc.save(function(err) {if (err) return console.error(err);});
    }
  });

}

async function getUsers() {
  return User.find({}).lean().exec();
}

function resetDatabase() {
  User.deleteMany({}).then(() => console.log('Database reset')); // {} = delete everything
}   

async function deleteUserLastDrink(user) {
  await User.findById({ _id: user.id }, async function(err, doc) {

    if (doc) {// check if user exists

      if (doc.drinks.length == 1) { // no more drinks after deletion: remove user from database
        User.deleteOne({ _id: user.id }, function(err, result) {
          if (err) return console.error(err);
        });
      }

      else { // still more drinks after deletion: remove last item from drinks array, keep user 
        doc.drinks.pop();
        doc.save(function(err) {if (err) return console.error(err);});
      }

    }
  }); 
}

async function deleteUserAllDrinks(user) {
  await User.findById({ _id: user.id }, async function(err, doc) {

    if (doc) {// check if user exists

        User.deleteOne({ _id: user.id }, function(err, result) {
          if (err) return console.error(err);});
      }

  }); 
}

module.exports = {
  initDB, 
  addDrink, 
  resetDatabase, 
  getUsers, 
  deleteUserLastDrink,
  deleteUserAllDrinks
}

