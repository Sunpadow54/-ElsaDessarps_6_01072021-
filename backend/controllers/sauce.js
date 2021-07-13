// Sauce Controls
// ------------------------- IMPORTS -------------------------

const fs = require('fs'); // package from node (file system)
// ---- import User Model
const Sauce = require('../models/Sauce');


// ============================================================
// -------------------------- CONTROLS ------------------------

// ---- Create new Sauce

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
        usersLiked: [],
        usersDisliked: [],
        likes: 0,
        dislikes: 0
    });

    // save new sauce in db
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce créée' })) // response need to be send to front
        .catch(error => res.status(400).json({ error }));
};


// ---- Modify Sauce

exports.modifySauce = (req, res, next) => {
    // create the object js from modif :
    const sauceObject = req.file ? // check if user has made a modif
        { // yes
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        : { ...req.body }; // no

    // update the sauce from parameter id
    Sauce.updateOne({ _id: req.params.id }, {
        ...sauceObject,
        _id: req.params.id
    })
        .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
        .catch(error => res.status(400).json({ error }));
};


// ---- Delete Sauce

exports.deleteSauce = (req, res, next) => {
    // search the name of the file
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // seach name of file
            const filename = sauce.imageUrl.split('/images/')[1];
            // use fs 'file system' to delete from folder "images"
            fs.unlink(`images/${filename}`, () => {
                // and from the db
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
}


// Likes
exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId;
    const userChoice = req.body.like;
    const filter = { _id: req.params.id };

    Sauce.findOne(filter)
        .then(thisSauce => {

            // Check if the user has already vote and what (from db)
            let hasAlreadyVote = thisSauce.usersLiked.includes(userId) ? 'like'
                : thisSauce.usersDisliked.includes(userId) ? 'dislike'
                : false;
            
            // Initialize 'update' variable for next crud unpdateOne
            let update;

            // Populate 'update' variable according to user vote
            switch (userChoice) {
                // Like
                case (1):
                    if (!hasAlreadyVote) {
                        update = {
                            '$addToSet': { 'usersLiked': userId },
                            '$inc': { 'likes': 1 }
                        };
                    }
                    break;
                // Dilike
                case (-1):
                    if (!hasAlreadyVote) {
                        update = {
                            '$addToSet': { 'usersDisliked': userId },
                            '$inc': { 'dislikes': 1 }
                        };
                    }
                    break;
                // Reset
                case (0):
                    // user has already Liked before
                    if (hasAlreadyVote === 'like') {
                        update = {
                            '$pull': {
                                'usersLiked': userId,
                            },
                            '$inc': { 'likes': -1 }
                        };
                    }
                    // user has already Dislike before
                    if (hasAlreadyVote === 'dislike') {
                        update = {
                            '$pull': {
                                'usersDisliked': userId
                            },
                            '$inc': { 'dislikes': -1 }
                        };
                    }
                    break;
            }

            // Update with 'update' var :  Likes/Dislikes (if there is a proper changes)
            if (update !== undefined) {
                Sauce.updateOne(filter, update)
                    .then(() => res.status(200).json({ message: 'changes are made here (like or dislike whatever ..' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
}



// ---- Get One Sauce

exports.getOneSauce = (req, res, next) => {
    // find one sauce from id param
    Sauce.findOne({ _id: req.params.id })
        .then(thisSauce => res.status(200).json(thisSauce))
        .catch(error => res.status(400).json({ error }));
}


// ---- Get All Sauces

exports.getAllSauces = (req, res, next) => {
    // find all things in mongoDb
    Sauce.find()
        .then(allSauces => res.status(200).json(allSauces))
        .catch(error => res.status(400).json({ error }));
}
