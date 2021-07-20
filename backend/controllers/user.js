// User Controls
// ------------------------- IMPORTS -------------------------

const bcrypt = require('bcrypt'); // package password cryptage
const jwToken = require('jsonwebtoken'); // package token
const dotEnv = require('dotenv'); // DotEnv
const { encryptEmail } = require('../config/crypto.js'); // import crypto tool
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
                email: encryptEmail(req.body.email), // use crypto to mask email
                password: passwordHashed
            });
            // Save in db
            user.save()
                .then(() => res.status(201).json({ message: 'User is successfully created' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};


// ---- Log Users

exports.login = (req, res, next) => {
    // find the user from the email he sent
    User.findOne({ email: encryptEmail(req.body.email) })
        .then(user => {

            // User does Not Exist
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }

            // User Exist, use bcrypt to compare password
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {

                    // Password Wrong
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }

                    dotEnv.config(); // invoking the dotenv config for secret key token

                    // Password Good
                    res.status(200).json({

                        // send user _id & token auth
                        userId: user._id,
                        token: jwToken.sign(
                            // 1rst param : payload : data we wants to encode
                            { userId: user._id },
                            // 2nd param : secret key for encode
                            process.env.TOKEN_KEY,
                            // 3rd param : to configure duration of the token
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};