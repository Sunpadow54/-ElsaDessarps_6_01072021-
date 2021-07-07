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
        likes: 0,
        dislikes: 0,
        usersLiked: [] ,
        usersDisliked: [],
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
        
            let update;

            if(userChoice === 1) {
                update = { 
                    '$addToSet': { usersLiked: userId },
                    '$inc': { likes: 1 }
                };
            }

            if(userChoice === -1) {
                update = { 
                    '$addToSet': { usersDisliked: userId },
                    '$inc': { dislikes: 1 }
                };
            }

            if(userChoice === 0) {
                if(thisSauce.usersLiked.includes(userId)) {
                    update = { 
                        '$pull': { 
                            usersLiked: userId
                        },
                        '$inc': { likes: -1 }
                    };
                }
                if(thisSauce.usersDisliked.includes(userId)) {
                    update = { 
                        '$pull': { 
                            usersDisliked: userId
                        },
                        '$inc': { dislikes: -1 }
                    };
                }
            }

            Sauce.updateOne(filter,update)
                .then(() => res.status(200).json({ message: 'changes are made here (like or dislike whatever ..' }))
                .catch(error => res.status(400).json({ error: error + 'erreur udpate' }));
        })
        .catch(error => res.status(400).json({ error }));



/* TESTS */
/*     Sauce.updateOne(
        { _id: req.params.id }, {
        // add userId in array usersLike
        
        $set : {
            $cond: [ { $eq: [userChoice, 0] }, 
                { $pull: { usersLiked: userId, 
                        usersDisliked: userId }}, 
                {
                    $push: { usersLiked: userId }
                } 
            
            
            ] */


            /*{ $switch: {
                branches: [
                        { 
                            case: { $eq: [ userChoice, 1] }, 
                            then: { $push: { usersLiked: userId } }
                        },

                        { 
                            case: { $eq: [userChoice, -1] }, 
                            then: { $push: { usersDisliked: userId }}
                        },

                        { 
                            case: { $eq: [userChoice, 0] }, 
                            then: { $pull: { usersLiked: userId, 
                                            usersDisliked: userId }}
                        },
                        {
                            default: { $inc: { likes: 1 } }
                        }
                        
                ]
            } }*/
        
/*     })
        .then(() => res.status(200).json({ message: '' }))
        .catch(error => res.status(400).json({ error })); */


/* 
    // user has like the Sauce & not already liked
    if (userChoice === 1 ) {
        Sauce.updateOne(
            { _id: req.params.id }, {
            // add userId in array usersLike
            $push: { usersLiked: userId },
        })
            .then(() => res.status(200).json({ message: 'L\'utilisateur a aimé la Sauce' }))
            .catch(error => res.status(400).json({ error }));
    }

    // user has dislike the Sauce
    if (userChoice < 0 ) {
        Sauce.updateOne({ _id: req.params.id}, {
            // add userId in array usersDislike
            $push: { usersDisliked: userId },
        })
            .then(() => res.status(200).json({ message: 'L\'utilisateur n\'a pas aimé la Sauce' }))
            .catch(error => res.status(400).json({ error }));
    }


    // user reset choice
    if (userChoice === 0 ) {
        Sauce.updateOne({ _id: req.params.id}, {
            $pull: { usersLiked: userId, 
                    usersDisliked: userId }
        })
            .then(() => res.status(200).json({ message: 'L\'utilisateur reset' }))
            .catch(error => res.status(400).json({ error }));
    } */




/*     Sauce.findOne({ _id: req.params.id })
        .then(thisSauce => {

            // user has like the Sauce & not already liked
            if (userChoice === 1 && !thisSauce.usersLiked.includes(userId)) {
                // then add a like and userid
                thisSauce.usersLiked.push(userId);
                thisSauce.likes ++;
                // check if user has disliked before
                if ( thisSauce.usersDisliked.includes(userId) ) {
                    // delete userId from array of usersDislike & delete one dislike
                    thisSauce.usersDisliked = array.filter(e => e != "userId");
                    thisSauce.dislikes -= 1;
                }
            }

            // user has dislike the Sauce
            if (userChoice < 0 && !thisSauce.userDisliked.includes(userId)) {
                // then add a dislike and userid
                thisSauce.usersDisliked.push(userId);
                thisSauce.dislikes ++;
                // check if user has liked before
                if ( thisSauce.usersLiked.includes(userId) ) {
                    // delete userId from array of usersDislike & delete one dislike
                    thisSauce.usersLiked = array.filter(e => e != "userId");
                    thisSauce.likes -= 1;
                }
            }

            console.log(thisSauce);
            // update the sauce from parameter id
            Sauce.updateOne({ _id: thisSauce._id }, {
                
            })
                .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error })); */

}



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
