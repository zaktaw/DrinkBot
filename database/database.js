const Drink = require('./schema.js');

function initDB() {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/DrinkBot', {useNewUrlParser: true, useUnifiedTopology: true});

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error'));
  db.once('open', function() {
    console.log('Database is connected');
  });
}

function addDrink(title, user) {

  const drink = new Drink({ title: title, user: user });

  drink.save(function(err, drink) {
    if (err) return console.error(err);
    console.log(drink.title + " was added");
    return true;
  });
}

function getDrinks() {
  Drink.find((err, drinks) => {
    if (err) return console.error(err);
    console.log(drinks);
  });
}

module.exports = {initDB, addDrink, getDrinks}

