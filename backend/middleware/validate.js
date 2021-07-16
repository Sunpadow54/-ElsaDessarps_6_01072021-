// middleware validate input Email + password ...

// ------------------------- IMPORTS -------------------------

const { check, validationResult } = require('express-validator'); // package


const userSignUpRules = () => {
    return [
        // check if 'email' input is filled / is an email
        check('email')
            .trim()
            .notEmpty().withMessage('this field is empty')
            .isEmail().withMessage('this email is not valid'),
        // Check if password input is filled / minimum 5 chars / correspond to regex
        check('password')
            .trim()
            .notEmpty().withMessage('this field is empty')
            .isLength({ min: 5 })
            .withMessage('password must be at least 5 chars long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/)
            .withMessage('password must contain at least one digit, and one uppercase letter'),
    ]
}


const validateSignUp = (req, res, next) => {
    const checkErrors = validationResult(req);

    // handle messages if password or email is not good
    if (!checkErrors.isEmpty()) {
        // create an array of error messages
        const errors = checkErrors.array().map(error => {
            return { [error.param + 'Error']: error.msg }
        });

        return res.status(418).json({ errors })
    }

    next();
}

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = { userSignUpRules, validateSignUp }
