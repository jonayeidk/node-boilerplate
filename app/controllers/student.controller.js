const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

const { validationResult } = require('express-validator');
// Create and Save a new Student
exports.create = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

   
    if (!req.file){
        res.status(401).send({
            message: "Image can not be empty!"
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
                err.message || "Some error occurred while creating the Student."
        });
    });
    

};

// Retrieve all Students from the database.
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
                    err.message || "Some error occurred while retrieving Students."
            });
        });

};

// Find a single Student with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Students."
            });
        });
};

// Update a Student by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    var student_data = {
        name: req.body.name,
        email: req.body.email,
    };

    if (req.file) {
        student_data['image'] =  req.file.destination + req.file.filename;
    }


    Student.update(student_data,{
        where:{id:id}
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Student was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Student with id=" + id
            });
        });

};

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    
    Student.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Student was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Student with id=" + id
        });
    });

};

// Delete all Students from the database.
exports.deleteAll = (req, res) => {

    Student.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Students were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Students."
            });
        });
};

// Find all published Students
exports.findAllPublished = (req, res) => {

};