var mongoose = require('mongoose');

///<!-- DB Schema definition --!> ////
var studentSchema = mongoose.Schema({

    studentname: String,
    phone: Number,
    email: String,
    datecreated: Date,
    ImageName: String,
    courseslist: Array,
    numberOfCourses: Number
});


var student = mongoose.model("student", studentSchema);

///<!-- DB Schema Students CRUD operations --!> ////

///<!-- DB Schema Create operations --!> ////

function Create_student(sent_student, res) {

    //////////// VALIDATION OF CREDENTIALS GPES HERE!!///////
    var currentdate = new Date();

    var Created_student = new student({

        studentname: sent_student.studentname,
        phone: sent_student.phone,
        email: sent_student.email,
        datecreated: currentdate,
        ImageName: sent_student.ImageName,
        courseslist: [],
        numberOfCourses: 0
    });

    Created_student.save(function () {
        var ret = "student was saved";
        console.log(ret);
        res.send('student was saved');
    });
}

function delete_student(sent_student, res) {
    console.log('sent_student._id:  ' + sent_student._id);
    student.deleteOne({_id: sent_student._id}, function () {
        console.log("done");
    });
    var ret = 'Deleted Successfully';
    res.send(ret);
}

function get_students(req, res, next) {
    student.find({}, function (err, students) {
        if (err) {
            return err;
        }
        res.send(students);
    });
}

function get_student(sent_studentname, res) {
    student.find({studentname: sent_studentname}, function (err, foundStudent) {
        if (err) {
            return err;
        }
        res.send(foundStudent);
    });
}

function update_student(sent_student, res) {
    student.update({_id: sent_student._id}, sent_student, function (err, foundStudent) {
        if (err) {
            return err;
        }
        res.send('student updated successfully');
    });
}


var self = module.exports = {

    CreateStudent: function (createdStudent, res) {
        return Create_student(createdStudent, res);
    },
    deleteStudent: function (sentStudent, res) {
        return delete_student(sentStudent, res);
    },
    getStudents: function (req, res, next) {
        return get_students(req, res, next);
    },
    getStudent: function (sent_studentname, res) {
        return get_student(sent_studentname, res);
    },
    updateStudents: function (sent_student, res) {
        return update_student(sent_student, res)
    }


};

