const mongoose = require('mongoose');

// define schema
const userSchema = mongoose.Schema({
    _id: String, // Discord user ID
    name: String, // Discord username
    drinks: [String] // array of user drinks
});

// export model
module.exports = mongoose.model('User', userSchema);

