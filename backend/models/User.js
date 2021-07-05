// User model for mongodb

// ------------------------- IMPORTS -------------------------

const mongoose = require('mongoose'); // Mongoose package to interact with mongoDB
const uniqueValidator = require('mongoose-unique-validator'); // package unique validator


// ============================================================
// ------------------------- SCHEMA -------------------------

// (used to create schema for saving in mongoDb)
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


userSchema.plugin(uniqueValidator); // you can"t have the same emailaddress

// ============================================================
// ------------------------- EXPORT ---------------------------
// ----- Export model user
module.exports = mongoose.model('User', userSchema);