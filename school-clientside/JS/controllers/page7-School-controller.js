app.controller("page7", function ($scope, $http, sharedProperties, $location) {
    console.log('page7: school ');

    if (!sharedProperties.isLoggedIn()) {
        $location.path('/login');   //redirect to login page if not logged in
    }

    var students = [];
    var courses = [];

    $http.post('http://localhost:3000/students', sharedProperties.getToken())
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                students.push(response.data[i]);
            }
            console.log("Students: " + JSON.stringify(students));
            $scope.students = students;

        }, function (response) {
            //Second function handles error
            $scope.content = "Something went wrong in Students func:" + response;
            console.log($scope.content);
        });

    $http.post('http://localhost:3000/courses', sharedProperties.getToken())
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                courses.push(response.data[i]);
            }
            console.log("courses: " + JSON.stringify(courses));
            $scope.courses = courses;

        }, function (response) {
            //Second function handles error
            $scope.content = "Something went wrong in courses func:" + response;
            console.log($scope.content);
        });


    $scope.reload = function () {
        location.reload();
    };


    $scope.createStudent = function () {          //createStudent- is the function , CreatedStudent- the object
        console.log("Create new student");
        $scope.dinamic_display_state = "create-student";
        $scope.content = false;
        $scope.CreatedStudent = {};
        return;
    };
    $scope.deleteStudent = function (deleted) {          //deleteStudent- is the function , DeletedStudent- the object
        console.log("delete new Students");
        $scope.dinamic_display_state = "delete-student";
        $scope.content = "Are you sure you wish to delete?";
        $scope.DeletedStudent = deleted;
        return;
    };

    $scope.submitCreatedStudent = function () {
        console.log('got to submit Students func');

        var sentData = sharedProperties.addToken($scope.CreatedStudent);

        $http.post('http://localhost:3000/students/create', sentData).then(function (result) {
            $scope.content = result.data;
            console.log(result.data);
            $scope.getStudent();
        }, function (err) {
            $scope.content = err;
        });
    };

    $scope.submitDeletedStudent = function (DeletedStudent) {
        console.log("delete:" + DeletedStudent);

        var sentData = sharedProperties.addToken($scope.DeletedStudent);

        $http.post('http://localhost:3000/students/delete', sentData).then(function (result) {
            $scope.content = result.data;
            console.log(result.data);
            $scope.getStudent();
        }, function (err) {
            $scope.content = err;
            console.dir('err: '+JSON.stringify(err));
        });
    };

    $scope.submitEditedStudent = function () {
        console.log('got to submit Students func');

        var sentData = sharedProperties.addToken($scope.EditStudent);

        $http.post('http://localhost:3000/students/update', sentData).then(function (result) {
            $scope.content = result.data;
            console.log(result.data);
            $scope.getStudent();
        }, function (err) {
            $scope.content = err;
        });
    };

    $scope.getStudent = function () {

        console.log('got to get Students func');
        var students = [];

        $http.post('http://localhost:3000/students', sharedProperties.getToken())
            .then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    students.push(response.data[i]);
                }
                console.log("Students: " + JSON.stringify(students));
                $scope.students = students;

            }, function (response) {
                //Second function handles error
                $scope.content = "Something went wrong in Course func:" + response;
                console.log($scope.content);
            });
    };


    $scope.editStudent = function (student) {          //editStudent- is the function , EditStudent- the object
        console.log("edit: " + student);
        $scope.dinamic_display_state = "edit-student";
        $scope.content = false;
        var allcourses = $scope.courses;
        var displayCourses = [];

        for (i = 0; i < allcourses.length; i++) {
            console.log('test no' + i + ": " + student.courseslist.indexOf(allcourses[i]._id));
            if (student.courseslist.indexOf(allcourses[i]._id) !== -1) {
                var ncourse = {
                    "_id": allcourses[i]._id,
                    "coursename": allcourses[i].coursename,
                    "checked": true
                };

                displayCourses.push(ncourse);
                console.log('ncourse: ' + JSON.stringify(ncourse));
            }
            else if (student.courseslist.indexOf(allcourses[i]._id) == -1) {
                var ncourse = {
                    "_id": allcourses[i]._id,
                    "coursename": allcourses[i].coursename,
                    "checked": false
                };

                displayCourses.push(ncourse);
                console.log('ncourse: ' + JSON.stringify(ncourse));
            }
        }

        student.coursechecked = displayCourses;
        $scope.EditStudent = student;
        return;
    };

    $scope.editCourse = function (course) {          //editCourse- is the function , EditCourse- the object
        console.log("edit: " + course);
        $scope.dinamic_display_state = "edit-course";
        $scope.content = false;
        var allstudents = $scope.students;
        var displayStudents = [];

        for (i = 0; i < allstudents.length; i++) {
            console.log('test no' + i + ": " + course.studentlist.indexOf(allstudents[i]._id));
            if (course.studentlist.indexOf(allstudents[i]._id) !== -1) {
                var nstudent = {
                    "_id": allstudents[i]._id,
                    "studentname": allstudents[i].studentname,
                    "checked": true
                };


                displayStudents.push(nstudent);
                console.log('nstudent: ' + nstudent);
            }
            else if (course.studentlist.indexOf(allstudents[i]._id) == -1) {
                var nstudent = {
                    "_id": $scope.students[i]._id,
                    "studentname": allstudents[i].studentname,
                    "checked": false
                };

                displayStudents.push(nstudent);
                console.log('nstudent: ' + nstudent);
            }
        }

        course.studentchecked = displayStudents;
        $scope.EditCourse = course;
        return;
    };

    $scope.togglestudent = function (id) {
        console.log("got to checkbox toggle function");
        var list = $scope.EditCourse.studentlist;
        var index = list.indexOf(id);

        if (index == -1) {
            list.push(id);
        }
        else if (index !== -1) {
            list.splice(index, 1);
        }
        console.log("list: " + list);
        $scope.EditCourse.studentlist = list;
    };

    $scope.togglecourse = function (id) {
        console.log("got to checkbox toggle function");
        var list = $scope.EditStudent.courseslist;
        var index = list.indexOf(id);

        if (index == -1) {
            list.push(id);
        }
        else if (index !== -1) {
            list.splice(index, 1);
        }
        console.log("list: " + list);
        $scope.EditStudent.courseslist = list;
    };

    $scope.createCourse = function () {          //createCourse- is the function , CreateCourse- the object
        console.log("Create new course");
        $scope.dinamic_display_state = "create-course";
        $scope.content = false;
        $scope.CreatedCourse = {};
        return;
    };
    $scope.deleteCourse = function (deleted) {          //deleteCourse- is the function , DeletedCourse- the object
        console.log("delete course");
        $scope.dinamic_display_state = "delete-course";
        $scope.content = "Are you sure you wish to delete?";
        $scope.DeletedCourse = deleted;
        return;
    };

    $scope.submitCreatedCourse = function () {
        console.log('got to submit Course func');

        var sentData = sharedProperties.addToken($scope.CreatedCourse);

        $http.post('http://localhost:3000/courses/create', sentData).then(function (result) {
            $scope.content = result.data;
            console.log(result.data);
            $scope.getCourse();
        }, function (err) {
            $scope.content = err;
        });
    };

    $scope.submitDeletedCourse = function (DeletedCourse) {
        console.log("delete:" + DeletedCourse);

        var sentData = sharedProperties.addToken(DeletedCourse);
        $http.post('http://localhost:3000/courses/delete', sentData).then(function (result) {
            $scope.content = result.data;
            console.log(result.data);
            $scope.getCourse();
        }, function (err) {
            $scope.content = err;
        });
    };

    $scope.submitEditedCourse = function () {
        console.log('got to submit Course func');

        var sentData = sharedProperties.addToken($scope.EditCourse);

        $http.post('http://localhost:3000/courses/update', sentData).then(function (result) {
            $scope.content = result.data;
            console.log(result.data);
            $scope.getCourse();
        }, function (err) {
            $scope.content = err;
        });
    };

    $scope.EditCourseCheckStudent = function (id) {
        console.log("checked: " + id);
    };

    $scope.getCourse = function () {

        console.log('got to get Course func');


        $http.post('http://localhost:3000/courses', sharedProperties.getToken())
            .then(function (response) {
                var courses = [];
                for (var i = 0; i < response.data.length; i++) {
                    courses.push(response.data[i]);
                }
                console.log("courses: " + JSON.stringify(courses));
                $scope.courses = courses;

            }, function (response) {
                //Second function handles error
                $scope.content = "Something went wrong in Students func:" + response;
                console.log($scope.content);
            });
    };

});


