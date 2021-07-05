// ------------------------- IMPORTS -------------------------

const express = require('express'); // framework express


// ============================================================

const app = express();
app.use((req, res) => {
    res.json({ message: 'votre requête à bien été reçue'});
});


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = app;