
var mongoose = require('mongoose');



///<!-- DB Schema definition --!> ////
var courseSchema = mongoose.Schema({
    coursename:String,
    description:String,
    numberOfStudents:Number,
    studentlist:Array,
    classroom:String,
    duration:Array,
    datecreated:Date,
    loggedInDates:Array                        // populated by:   addToSet(new Date);
});



var course = mongoose.model("course", courseSchema);

///<!-- DB Schema Course CRUD operations --!> ////

///<!-- DB Schema Create operations --!> ////

function Create_course(sent_course,res){

    console.log('got to create_course func in model');
    //////////// VALIDATION OF CREDENTIALS GOES HERE!!///////
    var currentdate = new Date();

    var Created_course = new course({

        coursename:sent_course.coursename,
        description:sent_course.description,
        studentsNumber:sent_course.studentsNumber,
        classroom:sent_course.classroom,
        duration:sent_course.duration,
        datecreated:currentdate,
        loggedInDates:[],
        coursesname:sent_course.students
    });

    Created_course.save(function () {
        var ret ="Course was saved";
        console.log(ret);
        res.send(ret);
    });
}

function delete_course(sent_course,res)
{

    //////////// VALIDATION OF CREDENTIALS GOES HERE!!///////
    console.log('sent_course._id:  '+sent_course._id);
    course.deleteOne({_id:sent_course._id},function(){
        console.log("done");});
    var ret = 'Deleted Successfully';
    res.send(ret);
}

function get_courses(req, res) {
    course.find({}, function (err,courses) {
        if (err) {
            res.send(err);
        }
        res.send(courses);
    });
}

function get_course(sent_username,res){
    course.find({username:sent_username}, function (err, foundCourse) {
        if (err) {
            return err;
        }
        res.send(foundCourse);
    });
}

function update_course(sent_course,res){
    course.update({_id:sent_course._id},sent_course, function (err, foundcourse) {
        if (err) {
            return err;
        }
        res.send('course updated successfully');
    });
}


var self = module.exports = {

    Createcourse: function(sentcourse,res){
        return Create_course(sentcourse,res);
    },
    deleteCourse: function(sentourse,res){
        return delete_course(sentourse,res);
    },
    getCourses: function(req, res){
        return get_courses(req, res);
    },
    getcourse: function(sentusername,res){
        return get_course(sentusername,res);
    },
    updatecourse: function(sentCourse,res){
        return update_course(sentCourse,res)
    }
};



