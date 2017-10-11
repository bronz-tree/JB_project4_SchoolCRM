var mongoose = require('mongoose');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

///<!-- DB Schema definition --!> ////
var adminSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    credentials: Number,
    displayname: String,
    phone: Number,
    email: String,
    datecreated: Date,
    loggedInDates: Array,                        // populated by:   addToSet(new Date);
    role: String,
    ImageName: String
});


var admin = mongoose.model("admin", adminSchema);

///<!-- DB Schema Admin VALIDATION operations --!> ////
///<!-- looks good, doesnt work --!> ////
adminSchema.pre('update', function (next) {
    var admin = this;

    if (!admin.isModified('password')) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(admin.password, salt, null, function (err, hash) {
            if (err) return next(err);

            admin.password = hash;
            next();
        });
    });
});


///<!-- DB Schema Admin CRUD operations --!> ////

///<!-- DB Schema Create operations --!> ////

function Create_admin(sent_admin, res) {
    console.log('got to create_admin func in model');
    //////////// VALIDATION OF CREDENTIALS GPES HERE!!///////
    var currentdate = new Date();
    console.log("auth: "+sent_admin.Authorization);
    if(sent_admin.Authorization == "manager"){
        sent_admin.credentials = 6000;
    }
    if(sent_admin.Authorization == "sales"){
        sent_admin.credentials = 3000;
    }

    var Created_admin = new admin({

        username: sent_admin.username,
        password: sent_admin.password,
        credentials: sent_admin.credentials,
        displayname: sent_admin.displayname,
        phone: sent_admin.phone,
        email: sent_admin.email,
        datecreated: currentdate,
        role: sent_admin.role,
        ImageName: sent_admin.imagename
    });

    bcrypt.genSalt(10, function (err, salt) {   //using bcrypt to hash password in DB
        if (err) return next(err);

        bcrypt.hash(Created_admin.password, salt, null, function (err, hash) {
            if (err) return next(err);
            console.log("Created_admin: " + JSON.stringify(Created_admin));
            Created_admin.password = hash;
            Created_admin.save(function () {
                var ret = "Admin was saved";
                console.log("CB in save func in module: " + ret);
                res.send('Admin was saved');
            });
        });
    });

}

function get_Admins(req, res, next) {
    console.log('got to function outside mongoose querry');
    admin
        .find({})
        .select("-password")
        .exec(function (err, admins) {
            if (err) {
                return ('error recieved in model: ' + err);
            }
            console.log('got to function inside mongoose querry');
            res.send(admins);
        });
}

function get_admin(sent_username, res) {
    admin.findOne({username: sent_username}, function (err, foundAdmin) {
        if (err) {
            return err;
        }
        res.send(foundAdmin);
    });
}

function update_admin(sent_admin, res) {

    if(sent_admin.Authorization == "manager"){
        sent_admin.credentials = 6000;
    }
    if(sent_admin.Authorization == "sales"){
        sent_admin.credentials = 3000;
    }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(sent_admin.password, salt, null, function (err, hash) {
            if (err) return next(err);

            sent_admin.password = hash;

            admin.update({_id: sent_admin._id}, sent_admin, function (err, foundAdmin) {
                if (err) {
                    return err;
                }
                res.send('admin updated successfully');
            });
        });
    });
}

function delete_admin(sent_admin, res) {
    //////////// VALIDATION OF CREDENTIALS GPES HERE!!///////
    console.log('sent_admin._id:  ' + sent_admin._id);
    admin.deleteOne({_id: sent_admin._id}, function () {
        console.log("done");
    });
    var ret = 'Deleted Successfully';
    res.send(ret);
}


var self = module.exports = {

    CreateAdmin: function (createdAdmin, res) {
        return Create_admin(createdAdmin, res);
    },
    deleteAdmin: function (sentAdmin, res) {
        return delete_admin(sentAdmin, res);
    },
    getAdmins: function (req, res, next) {
        return get_Admins(req, res, next);
    },
    getAdmin: function (sentAdmin, res) {
        return get_admin(sentAdmin, res);
    },
    updateAdmin: function (sentAdmin, res) {
        return update_admin(sentAdmin, res)
    },
    getadminschema: function () {
        return admin;
    }
};

