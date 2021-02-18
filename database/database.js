const Drink = require('./schema.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DrinkBot', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

function initDB() {
  db.on('error', console.error.bind(console, 'Connection error'));
  db.once('open', function() {
    console.log('Database is connected');
  });
}


function addDrink(title, user) {

  const drink = new Drink({ title: title, user: user });

  drink.save(function(err, drink) {
    if (err) return console.error(err);
    console.log("ADD: " + drink.user + " added " + drink.title);
  });
}

function getDrinks() {return Drink.find();}

function resetDatabase() {
  Drink.deleteMany({}).then(() => console.log('items delted')); // {} = delete everything
} 

module.exports = {initDB, addDrink, getDrinks, resetDatabase}

