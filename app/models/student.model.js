module.exports = (sequelize, Sequelize)=>{
    const Student = sequelize.define('students',{
        name:{
            type:Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING,
        },
        image:{
            type:Sequelize.STRING
        }
    });

    return Student;
}