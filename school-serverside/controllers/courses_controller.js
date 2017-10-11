
var coursesModel  = require('../models/courses_model.js');
var sanitizer = require('sanitize')();

/* not working
 function sanitizeSentcourse(sent_course){

 var Created_course = {
 username:sanitizer.value(sent_course.username,'string'),
 password:sanitizer.value(sent_course.password,'string'),
 credentials:sanitizer.value(sent_course.credentials,'string'),
 displayname:sanitizer.value(sent_course.displayname,'string'),
 phone:sanitizer.value(sent_course.phone,'phone'),
 email:sanitizer.value(sent_course.email,'email'),
 role:sanitizer.value(sent_course.role,'string'),
 ImageName:sanitizer.value(sent_course.imagename,'string')
 };

 return Created_course;
 }
 */


function create_course(sentcourse,res){
    console.log('got to create_course func in controller');

    var ret;
    ////         var Created_course = sanitizeSentcourse(sent_course);   /////SANITIZE INPUT HERE
    //////////// VALIDATION OF CREDENTIALS GPES HERE!!///////
    try{
        coursesModel.Createcourse(sentcourse,res);
    }
    catch(err){
        ret = "while creating course, an error has occured: "+err;
        console.log(ret);
        res.send(ret);
    }

}

function delete_course(sent_course,res)
{
    /////////// CHECK CREDENTIALS HERE  //////////
    /////////// SANITIZE INPUT HERE  //////////
    //var Deleted_course = sanitizeSentcourse(sent_course);
    var ret;

    try{
        coursesModel.deleteCourse(sent_course,res);
    }
    catch(err){
        ret = "while deleting course, an error has occured: "+err;
        console.log(ret);
        res.send(ret);
    }
}

function get_courses(req, res) {

    //////need to validate session again

    var ret;

    try{
        console.log('got to controller: get_courses func');
        coursesModel.getCourses(req, res);
        //console.log(ret);
        //return ret;
    }
    catch(err){
        ret = "while getting course list, an error has occured: "+err;
        console.log(ret);
        res.send(ret);
    }
}

function get_course(sent_course,res){
    var ret;
    console.log(sent_course);

    //////need to sanitize
    //////need to validate session again

    try{
        coursesModel.getcourse(sent_course.username,res);
    }
    catch(err){
        ret = "while getting course, an error has occured: "+err;
        console.log(ret);
        res.send(ret);
    }
}

function update_course(createdcourse,res){

    var ret;
    console.log(createdcourse);

    //////need to sanitize
    //////need to validate session again

    try{
        coursesModel.updatecourse(createdcourse,res);

    }
    catch(err){
        ret = "while getting course, an error has occured: "+err;
        console.log(ret);
        res.send(ret);
    }
}


var self = module.exports = {

    createCourse: function(createdCourse,res){
        return create_course(createdCourse,res);
    },
    deletecourse: function(sentCourses,res){
        return delete_course(sentCourses,res);
    },
    getcourses: function(req, res, next){
        return get_courses(req, res, next);
    },
    getcourse: function(sentCourses,res){
        return get_course(sentCourses,res);
    },
    updatecourse: function(sentCourses,res){
        return update_course(sentCourses,res);
    }

};

