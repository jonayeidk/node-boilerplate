// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');

module.exports = app => {
    const your_controller = require("../controllers/demo.controller.js");

    const multer = require("../middleware/multer");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", multer.form, 
    
        // username must be an email
        body('username').isEmail(),
        // password must be at least 5 chars long
        body('password').isLength({ min: 5 }),
        
        your_controller.create);

    // Retrieve all Tutorials
    router.get("/", your_controller.findAll);

    // Retrieve all published Tutorials
    router.get("/published", your_controller.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", your_controller.findOne);

    // Update a Tutorial with id
    router.put("/:id", your_controller.update);

    // Delete a Tutorial with id
    router.delete("/:id", your_controller.delete);

    // Delete all Tutorials
    router.delete("/", your_controller.deleteAll);

    app.use('/api/your_path', router);
};