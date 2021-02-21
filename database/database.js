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

  console.log('adding drink: ' + drink);

  await User.findById({ _id: user.id }, async function(err, doc) {
    if (err) {
      console.log(err);
    }

    if (!doc) {// user does not exist: add user
      const userDocument = new User({ _id: user.id, name: user.username, drinks: [drink] });

      userDocument.save(function(err, user) {
        if (err) return console.error(err);});
    }

    else { // user exists: add the drink to user's drinks array
      doc.drinks.push(drink);

      doc.save(function(err, user) {
        if (err) return console.error(err);});
    }
  });

}

async function getUsers() {
  return User.find({}).lean().exec();
}

function resetDatabase() {
  User.deleteMany({}).then(() => console.log('items delted')); // {} = delete everything
}   

module.exports = {initDB, addDrink, resetDatabase, getUsers}

