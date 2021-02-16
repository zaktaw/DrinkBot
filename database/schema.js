const mongoose = require('mongoose');

// define schema
const drinkSchema = mongoose.Schema({
    title: String,
    user: String
});

// export model
module.exports = mongoose.model('Drink', drinkSchema);

