const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

const { validationResult } = require('express-validator');
// Create and Save a new Tutorial
exports.create = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

   
    if (!req.file){
        res.status(401).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const student_data = {
        name: req.body.name,
        email: req.body.email,
        image: req.file.destination+req.file.filename
    };


    Student.create(student_data)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
        });
    });
    

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

    const name = req.query.name;
    const email = req.query.email;
    var nameCondition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    var emailCondition = email ? { email: { [Op.like]: `%${email}%` } } : null;

    Student.findAll({ where: nameCondition, emailCondition })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};