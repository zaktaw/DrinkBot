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


function addDrink(user, drink) {

  console.log('adding drink: ' + drink);
  // if user id is in database
  User.findById({ _id: user.id }, function(err, doc) {
    console.log('evaluating');
    if (err) {
      console.log('ERROR')
      console.log(err);
    }

    if (!doc) {// user is not in database
      console.log('User not in DB');
      const userDocument = new User({ _id: user.id, name: user.username, drinks: [drink] });

      userDocument.save(function(err, user) {
        if (err) return console.error(err);
        console.log("ADD: " + user.name + " added " + user.drinks);
      });
    }

    else {
      console.log('updating');
      let drinks = doc.drinks;
      drinks[drinks.length] = drink;
      doc.drinks = drinks;
      //doc.drinks[doc.drinks.length] = drink;
      doc.save(function(err, user) {
        if (err) return console.error(err);
        console.log("UPDATED: " + user.name + " : " + user.drinks);
      });
    }
  });

  
    // retrieve document for that user
    // update document: add drink to array
  // else
    // make new document with user id and empty array

  //
  
  /*
  drink.save(function(err, drink) {
    if (err) return console.error(err);
    console.log("ADD: " + drink.user + " added " + drink.title);
  });
  */
}

function getDrinks() {return User.find();}

function resetDatabase() {
  User.deleteMany({}).then(() => console.log('items delted')); // {} = delete everything
} 

module.exports = {initDB, addDrink, getDrinks, resetDatabase}

