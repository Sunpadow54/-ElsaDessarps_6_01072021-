// sauce Roads
// ------------------------- IMPORTS -------------------------

const express = require('express'); // Express Framework
// ----- Create router
const router = express.Router();

// ---- Import middelwares
const auth = require('../middleware/auth'); // to protect road (token)
const multer = require('../middleware/multer-config'); // to upload img

// ----- Import Controlls
const sauceCtrl = require('../controllers/sauce');


// ============================================================
// ------------------------- ROADS ----------------------------

router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);

router.post('/:id/like', auth, multer, sauceCtrl.likeSauce);

router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;