// Sauce model for mongodb

// ------------------------- IMPORTS -------------------------

const mongoose = require('mongoose'); // Mongoose package to interact with mongoDB


// ============================================================
// ------------------------- SCHEMA -------------------------

// (used to create schema for saving in mongoDb)
const sauceSchema = mongoose.Schema({
    // ( id auto by mongoDb )//
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: Array, required: true },
    usersDisliked: { type: Array, required: true },
});


// ============================================================
// ------------------------- EXPORT ---------------------------
// ----- Export model-name (schema we want to use)
module.exports = mongoose.model('Sauce', sauceSchema);