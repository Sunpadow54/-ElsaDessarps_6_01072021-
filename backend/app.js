// App
// ------------------------- IMPORTS --------------------------

const express = require('express'); // framework express
const bodyParser = require('body-parser'); // Package (to format body (ex: from Post request) )

// ---- Import Roads
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// ============================================================
// ----------------------- Create app -------------------------

const app = express();


// ---------------- Mongoose DB Connexion ---------------------

require('./db')(); // () used to show the messages log


// ------------------------- MIDDLEWARES ----------------------

// ---- Create header (for CORS error)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // all can access
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // can use all theses methods
    next();
});

// --- Format Json
app.use(bodyParser.json());

// --- Roads
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);



// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = app; // our server node