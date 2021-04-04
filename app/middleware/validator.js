const { check, body, validationResult } = require('express-validator');
const fs = require('fs');
//checking for validation errors 
const validate = (req, res, next) => {

    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    console.log("valdation error: ", errors.array());
    console.log("image: ", req.file);
    
    if (req.file !== undefined) {
        fs.unlinkSync(req.file.path)
    }

    return res.status(200).json({ errors: errors.array() });
}


//validating registration data...
const validateStudentCreate = (req, res) => {
    return [
        check('name').isLength({ min: 3, max: 20 }).trim().escape().withMessage('Name should be atleast 3-20 characters.'),
        check('email').isEmail().normalizeEmail().withMessage('Please enter a valid E-mail.'),
        // check('image').notEmpty().withMessage('Please a cover photo.'),
        // check('image', 'You must select an image.').notEmpty(),
    ];
}
//validating registration data...
const validateStudentUpdate = (req, res) => {
    return [
        check('name').isLength({ min: 3, max: 20 }).trim().escape().withMessage('Name should be atleast 3-20 characters.'),
        // check('email').isEmail().normalizeEmail().withMessage('Please enter a valid E-mail.'),
        // check('image').notEmpty().withMessage('Please a cover photo.'),
        // check('image', 'You must select an image.').notEmpty(),
    ];
}


module.exports = { validate, validateStudentCreate, validateStudentUpdate }