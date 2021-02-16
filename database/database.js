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

async function addDrink(title, user) {

  const drink = new Drink({ title: title, user: user });

  await drink.save(function(err, drink) {
    if (err) return console.error(err);
    console.log("ADD: " + drink.user + " added " + drink.title);
  });

  drinks = getDrinks();
}

function getDrinks() {return Drink.find();}

function resetDatabase() {
  Drink.deleteMany({}).then(() => console.log('items delted')); // {} = delete everything
} 

module.exports = {initDB, addDrink, getDrinks, resetDatabase}

