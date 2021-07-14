// App
// ------------------------- IMPORTS --------------------------

const express = require('express'); // framework express
const bodyParser = require('body-parser'); // Package (to format body (ex: from Post request) )
const path = require('path'); // from node
// security
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

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

// --- security
app.use(mongoSanitize()); // protect from injection (change all '$' and '.' from req)
app.use(helmet()); // Protect from cross-site scripting (XSS)

// --- middleware (to upload file) (after multer)
app.use('/images', express.static(path.join(__dirname, 'images')));

// --- Roads
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);



// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = app; // our server node