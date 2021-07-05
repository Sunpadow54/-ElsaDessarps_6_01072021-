// User Controls
// ------------------------- IMPORTS -------------------------

const bcrypt = require('bcrypt'); // package password cryptage
// ---- import User Model
const User = require('../models/User');


// ============================================================
// -------------------------- CONTROLS ------------------------

// ---- Create Users


exports.signup = (req, res, next) => {
    // hash password
    bcrypt.hash(req.body.password, 10)
        .then(passwordHashed => {
            const user = new User({
                email: req.body.email,
                password: passwordHashed
            });
            // Save in db
            user.save()
                .then(() => res.status(201).json({ message: 'User is successfully created' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};

// ---- Login Users

exports.login = (req, res, next) => {
    res.status(200).json({ message: 'connecte toi' });
};