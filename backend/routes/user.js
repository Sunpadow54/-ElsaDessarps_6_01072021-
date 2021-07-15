// User Roads
// ------------------------- IMPORTS -------------------------

const express = require('express'); // Express Framework


// ----- Create router
const router = express.Router();

// ---- Import middelwares
const limiter = require('../middleware/limiter-config');
// ----- Import Controlls
const userCtrl = require('../controllers/user');


// ============================================================
// ------------------------- ROADS ----------------------------

router.post('/signup', limiter, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = router;