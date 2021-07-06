// Sauce Controls
// ------------------------- IMPORTS -------------------------

// ---- import User Model
const Sauce = require('../models/Sauce');


// ============================================================
// -------------------------- CONTROLS ------------------------

// ---- Create 
exports.createSauce = (req, res, next) => {
    // récupère et transforme chaine en objet js
    const sauceObject = JSON.parse(req.body.sauce);
    // delete id (already one auto in db)
    delete sauceObject._id;
    // create new instance of Sauce ( see ./models)
    const sauce = new Sauce({
        ...sauceObject, // spread operator (copy all ...)
        // url image ex: http + :// + host + /images/ + name passed by multer
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [] ,
        usersDisliked: [],
    });

    // save new sauce in db
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce créée' })) // response need to be send to front
        .catch(error => res.status(400).json({ error : 'NOpe' +error }));
};


// ---- Get One Sauce

exports.getOneSauce = ( req, res, next) => {
    // find one sauce from id param
    Sauce.findOne({ _id: req.params.id })
        .then(thisSauce => res.status(200).json(thisSauce))
        .catch(error => res.status(400).json({ error }));
}


// ---- Get All Sauces

exports.getAllSauces = ( req, res, next) => {
    // find all things in mongoDb
    Sauce.find()
        .then(allSauces => res.status(200).json(allSauces))
        .catch(error => res.status(400).json({ error }));
}
