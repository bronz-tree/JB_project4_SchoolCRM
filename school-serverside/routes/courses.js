'use strict';

var express = require('express');
var router = express.Router();
var Controller = require('../controllers/courses_controller.js');
var jwt = require('../config/JWT-config.js');


/* GET all courses */

router.post('/', function (req, res) {
//  console.log("got to courses list");
    var auth = jwt.Sales_Cred_Check(req.body.Ttoken);

    if (!auth) {
        res.send("unauthorised access, please examine your credentials with administrator");
        return;
    }
    Controller.getcourses(req, res)

});

/* GET single course */

router.post('/course', function (req, res) {
    var auth = jwt.Sales_Cred_Check(req.body.Ttoken);

    if (!auth) {
        res.send("unauthorised access, please examine your credentials with administrator");
        return;
    }

    Controller.getcourse(req.body, res);
});

/* Create single course */

router.post('/create', function (req, res) {
    console.log('got to create course route');

    var auth = jwt.Manager_Cred_Check(req.body.Ttoken);

    if (!auth) {
        res.send("unauthorised access, please examine your credentials with administrator");
        return;
    }
    Controller.createCourse(req.body, res);
});

/* update single course */
router.post('/update', function (req, res) {
    console.log('got to create course route');

    var auth = jwt.Manager_Cred_Check(req.body.Ttoken);

    if (!auth) {
        res.send("unauthorised access, please examine your credentials with administrator");
        return;
    }
    Controller.updatecourse(req.body, res);
});

/* delete single course */
router.post('/delete', function (req, res) {
    console.log('got to delete course route');

    var auth = jwt.Sales_Cred_Check(req.body.Ttoken);

    if (!auth) {
        res.send("unauthorised access, please examine your credentials with administrator");
        return;
    }
    Controller.deletecourse(req.body, res);
});

module.exports = router;
