var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bcrypt = require('bcrypt-nodejs');


var admin = mongoose.model("admin");

module.exports = function (app) {

    app.use(require('express-session')({
        secret: "uwevewevewe4132",
        resave: true,
        saveUninitilaized: true,
        store: new MongoStore({
            url: 'mongodb://localhost/School-Management',
            collection: 'sessions'
        })    //used to save sassion in DB
    }));



// Init passport authentication
    app.use(passport.initialize());
// persistent login sessions
    app.use(passport.session());


// DELETE BEFORE DEPLOYMENT TO PRODUCTION!!!

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
        next();
    });

    passport.use('signin', new LocalStrategy({
                passReqToCallback : false
            },
            function (username, password, done) {
                admin.findOne({username: username}, function (err, admin) {
                    if (err) {
                        //console.log('login error: '+err);
                        return done(err);
                    }
                    if (!admin) {
                        //console.log('no admin by that name');
                        return done(null, false);
                    }
                    var cmp = bcrypt.compareSync(password, admin.password);
                    //console.log('cmp: '+cmp);
                    if (!cmp) {
                        //console.log('wrong pass ');
                        return done(null, false);
                    }
                    //console.log('correct pass ');
                    return done(null, admin);
                });
            })
    );

    passport.serializeUser(function(user, done) {
        console.log('serializeUser: '+user._id);
        done(null, user._id);
    });

    passport.deserializeUser(function(_id, done) {
        admin.findById(_id, function(err, user) {
            console.log('deserializeUser: '+user);
            done(err, user);
        });
    });

};

