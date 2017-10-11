var express = require('express');
var router = express.Router();
var passport = require('passport');
var Controller = require('../controllers/admins_controller.js');
var jwt = require('../config/JWT-config.js');

// Login endpoint
router.post('/login', function (req, res, next) {
    passport.authenticate('signin', function (err, admin) {
            if (err) {
                res.send({message:'sign in error '} );
            }
            console.log('err: ' + err);
            console.log('admin: ' + admin);

            if (admin) {
                req.login(admin, function (error) {
                    if (error) return next(error);
                    var tokenn = jwt.JWTencode(admin);
                    console.log("Request Login supossedly successful.");
                    res.status(200).send({
                        message: 'Login successful',
                        token: tokenn,
                        cred: '' + jwt.determine_Credentials(admin.credentials),
                        disname: '' + admin.displayname,
                        user: '' + admin.username
                    });
                });
            }
            if (!admin) {
                res.send({message:'wrong username or password'})
            }
        },
        function (err, admin) {
            console.log('err occured: ' + err);
            console.log('admin: ' + admin);
            res.send('err occured: server error during log in process');    //just sending about an error - no reason to exposeerror sort
        })(req, res, next);
});


// Logout endpoint
router.post('/logout', function (req, res) {
    req.logOut();
    req.session.destroy();
    res.send("logout success!");
});

module.exports = router;
