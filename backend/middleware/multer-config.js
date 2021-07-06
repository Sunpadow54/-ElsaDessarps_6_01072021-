// middleware multer config for files upload saves ...

// ------------------------- IMPORTS -------------------------

const multer = require('multer'); // package

// dico types extensions
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};



// objet to config
const imageStorage = multer.diskStorage({
    // destination
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // name
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})


module.exports = multer({ storage: imageStorage }).single('image');