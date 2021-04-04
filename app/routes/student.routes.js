const { uploadFile } = require('../middleware/multer.js');
const students = require ('../controllers/student.controller.js');
const valid = require ('../middleware/validator');
var router = require("express").Router();

module.exports= app => {
    // Create a new Tutorial
    router.post("/", uploadFile, valid.validateStudentCreate(), valid.validate, students.create);

    router.get("/", students.findAll);

    router.get("/:id", students.findOne);

    // Update a new Tutorial
    router.put("/:id", uploadFile, valid.validateStudentUpdate(), valid.validate, students.update);

    router.delete("/:id", students.delete);

    router.delete("/", students.deleteAll);

    app.use('/api/students', router);
}