// Sauce Controls
// ------------------------- IMPORTS -------------------------

// ---- import User Model
const Sauce = require('../models/Sauce');


// ============================================================
// -------------------------- CONTROLS ------------------------

// ---- Create 
exports.createSauce = (req, res, next) => {
    // récupère et transforme chaine en objet js
    const sauceObject = JSON.parse(re.body.thing);
    // delete id (already one auto in db)
    delete sauceObject._id;
    // create new instance of Sauce ( see ./models)
    const sauce = new Sauce({
        ...sauceObject // spread operator (copy all ...)
    });

    // save new sauce in db
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce créée' }))
        .catch(error => res.status(400).json({ error }));
};


// ---- Get One Sauce

exports.getOneSauce = ( req, res, next) => {
    // find one sauce from id param
    Sauce.findOne({ _id: req.params.id })
        .then(thisSauce => res.status(200))
        .catch(error => res.status(400).json({ error }));
}


// ---- Get All Sauces

exports.getAllSauces = ( req, res, next) => {
    // find all things in mongoDb
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}
