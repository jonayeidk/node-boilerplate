const { uploadFile, form } = require('../middleware/multer.js');

// ...rest of the initial code omitted for simplicity.
const { body } = require('express-validator');

const students = require ('../controllers/student.controller.js');
const valid = require ('../middleware/validator');

var router = require("express").Router();

module.exports= app => {
    // Create a new Tutorial
    router.post("/", uploadFile, valid.validateStudentCreate(), valid.validate, students.create);

    router.get("/", students.findAll);

    router.get("/:id", students.findOne);

    app.use('/api/students', router);
}