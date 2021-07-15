// middleware multer config for files upload saves ...

// ------------------------- IMPORTS -------------------------

const multer = require('multer'); // package

// ---------------------- Mime Library -------------------------

// lib types extensions
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
};

// ============================================================
// ---------------------- Middlewares -------------------------

// objet to config
const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, 'images')
    },

    filename: (req, file, callback) => {
        let name = file.originalname.split(' ').join('-'); // delete any space
         // delete extension (could be : name = name.substring(0, name.lastIndexOf('.'));)
        let newName = name.split('.');
        newName.pop();
        newName = newName.join('-');

        // create extension from mimetype library
        const extension = MIME_TYPES[file.mimetype];
        callback(null, newName + '_' + Date.now() + '.' + extension);
    }
})


module.exports = multer({ storage: storage }).single('image');