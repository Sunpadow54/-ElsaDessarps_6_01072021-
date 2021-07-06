// sauce Roads
// ------------------------- IMPORTS -------------------------

const express = require('express'); // Express Framework
// ----- Create router
const router = express.Router();

// ----- Import Controlls
const sauceCtrl = require('../controllers/sauce');
// ---- Import middelwares
const auth = require('../middleware/auth');


// ============================================================
// ------------------------- ROADS ----------------------------

router.post('/', auth, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;