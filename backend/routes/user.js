// User Roads
// ------------------------- IMPORTS -------------------------

const express = require('express'); // Express Framework
// ----- Create router
const router = express.Router();
// ----- Import Controlls
const userCtrl = require('../controllers/user');


// ============================================================
// ------------------------- ROADS ----------------------------

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.signup);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;