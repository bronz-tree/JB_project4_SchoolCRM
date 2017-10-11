var studentsModel  = require('../models/students_model.js');
var sanitizer = require('sanitize')();


function Create_student(sent_student,res){


    console.log('got to Create_student func in controller');

    ////         var Created_course = sanitizeSentcourse(sent_course);   /////SANITIZE INPUT HERE
    //////////// VALIDATION OF CREDENTIALS GPES HERE!!///////
    try{
        studentsModel.CreateStudent(sent_student,res);
    }
    catch(err){
        var ret = "while creating student, an error has occured: "+err;
        console.log(ret);
        res.send(ret);
    }
}

function delete_student(sent_student,res)
{
        /////////// CHECK CREDENTIALS HERE  //////////
        /////////// SANITIZE INPUT HERE  //////////
        //var Deleted_admin = sanitizeSentAdmin(sent_admin);
        var ret;

        try{
            studentsModel.deleteStudent(sent_student,res);
        }
        catch(err){
            ret = "while deleting student, an error has occured: "+err;
            console.log(ret);
            res.send(ret);
        }
}


function get_students(req, res, next) {


    //////need to validate session again

    try{
        console.log('got to controller: students func');
        studentsModel.getStudents(req, res, next);
    }
    catch(err){
        var ret = "while getting student list, an error has occured: "+err;
        console.log(ret);
        res.send(ret);
    }
}

function get_student(sent_student,res){
    var ret;
    console.log(sent_student);

    //////need to sanitize
    //////need to validate session again

    try{
        studentsModel.getStudent(sent_student.username,res);
    }
    catch(err){
        ret = "while getting student, an error has occured: "+err;
        console.log(ret);
        res.send(ret);
    }
}
function update_student(createdStudent,res){

    var ret;
    console.log("got to update student in controller");

    console.log(createdStudent);

    //////need to sanitize
    //////need to validate session again

    try{
        studentsModel.updateStudents(createdStudent,res);

    }
    catch(err){
        ret = "while getting admin, an error has occured: "+err;
        console.log(ret);
        res.send(ret);
    }
}


var self = module.exports = {

    createStudent: function(createdStudent,res){
        return Create_student(createdStudent,res);
    },
    deleteStudent: function(createdStudent,res){
        return delete_student(createdStudent,res);
    },
    getStudents: function(req, res, next){
        return get_students(req, res, next);
    },
    getStudent: function(sent_student,res){
        return get_student(sent_student,res);
    },
    updateStudent: function (createdStudent,res){
        return update_student(createdStudent,res);
    }

};

