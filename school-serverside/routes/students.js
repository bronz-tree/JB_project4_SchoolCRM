'use strict';

var express = require('express');
var router = express.Router();
var Controller = require('../controllers/students_controller.js');
var jwt = require('../config/JWT-config.js');

/* GET all students */

router.post('/', function (req, res, next) {
    console.log("got to student list");
    var auth = jwt.Sales_Cred_Check(req.body.Ttoken);

    if (!auth) {
        res.send("unauthorised access, please examine your credentials with administrator");
        return;
    }
    Controller.getStudents(req, res, next)

});


/* Create single student */

router.post('/create', function (req, res, next) {
    console.log('got to create student route');
    var auth = jwt.Sales_Cred_Check(req.body.Ttoken);

    if (!auth) {
        res.send("unauthorised access, please examine your credentials with administrator");
        return;
    }
    Controller.createStudent(req.body, res);
});

/* update single student */
router.post('/update', function (req, res, next) {
    console.log('got to update student route');
    var auth = jwt.Sales_Cred_Check(req.body.Ttoken);

    if (!auth) {
        res.send("unauthorised access, please examine your credentials with administrator");
        return;
    }
    Controller.updateStudent(req.body, res);
});

/* delete single student */
router.post('/delete', function (req, res, next) {
    console.log('got to delete student route');
    var auth = jwt.Sales_Cred_Check(req.body.Ttoken);

    if (!auth) {
        res.send("unauthorised access, please examine your credentials with administrator");
        return;
    }
    Controller.deleteStudent(req.body, res);
});


module.exports = router;

