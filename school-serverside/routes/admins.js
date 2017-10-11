var express = require('express');
var router = express.Router();
var Controller = require('../controllers/admins_controller.js');
var jwt = require('../config/JWT-config.js');


/* GET all admins */
router.post('/', function (req, res, next) {

    //console.log("req.body: " + JSON.stringify(req.body));
    var auth = jwt.Manager_Cred_Check(req.body.Ttoken);

    if (!auth) {
        res.send("unauthorised access, please examine your credentials with administrator");
        return;
    }
    Controller.getadmins(req, res, next);

});

/* GET single admin */

router.post('/administrator', function (req, res, next) {

    var auth = jwt.Manager_Cred_Check(req.body.Ttoken);

    if (!auth) {
        res.send("unauthorised access, please examine your credentials with administrator");
        return;
    }
    Controller.getadmin(req.body, res);
});

/* Create single admin */

router.post('/create', function (req, res, next) {
    var auth = jwt.Owner_Cred_Check(req.body.Ttoken);

    if (!auth) {
        res.send("unauthorised access, please examine your credentials with administrator");
        return;
    }
    console.log('got to create admin route');
    Controller.createAdmin(req.body, res);
});

/* update single admin */
router.post('/update', function (req, res, next) {

    //console.log("req.body: " + JSON.stringify(req.body));
    console.log('got to update admin route');
    var auth = jwt.Owner_Cred_Check(req.body.Ttoken);

    if (!auth) {
        res.send("unauthorised access, please examine your credentials with administrator");
        return;
    }
    Controller.updateadmin(req.body, res);
});

/* delete single admin */
router.post('/delete', function (req, res, next) {
    console.log('got to delete admin route');
    console.log('got to delete with token: '+ req.body.Ttoken);

    var auth = jwt.Manager_Cred_Check(req.body.Ttoken);

    if (!auth) {
        res.send("unauthorised access, please examine your credentials with administrator");
        return;
    }
    Controller.deleteadmin(req.body, res);
});


module.exports = router;
