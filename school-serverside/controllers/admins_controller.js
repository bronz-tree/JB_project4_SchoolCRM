
var adminsModel  = require('../models/admins_model.js');


/* not working
function sanitizeSentAdmin(sent_admin){

    var Created_admin = {
        username:sanitizer.value(sent_admin.username,'string'),
        password:sanitizer.value(sent_admin.password,'string'),
        credentials:sanitizer.value(sent_admin.credentials,'string'),
        displayname:sanitizer.value(sent_admin.displayname,'string'),
        phone:sanitizer.value(sent_admin.phone,'phone'),
        email:sanitizer.value(sent_admin.email,'email'),
        role:sanitizer.value(sent_admin.role,'string'),
        ImageName:sanitizer.value(sent_admin.imagename,'string')
    };

    return Created_admin;
}
*/


function create_admin(sent_admin,res){
    console.log('got to create_admin func in controller');

    var ret;
    ////         var Created_admin = sanitizeSentAdmin(sent_admin);   /////SANITIZE INPUT HERE
    //////////// VALIDATION OF CREDENTIALS GPES HERE!!///////
    try{
        adminsModel.CreateAdmin(sent_admin,res);
    }
    catch(err){
        ret = "while creating admin, an error has occured: "+err;
        console.log(ret);
        res.send(ret);
    }

}

function delete_admin(sent_admin,res)
{
    /////////// CHECK CREDENTIALS HERE  //////////
    /////////// SANITIZE INPUT HERE  //////////
    //var Deleted_admin = sanitizeSentAdmin(sent_admin);
    var ret;

    try{
        adminsModel.deleteAdmin(sent_admin,res);
    }
    catch(err){
        ret = "while deleting admin, an error has occured: "+err;
        console.log(ret);
        res.send(ret);
    }
}

function get_admins(req, res, next) {

    //////need to validate session again

    var ret;

    try{
        console.log('got to controller: get_Admins func');
        adminsModel.getAdmins(req, res, next);
        //console.log(ret);
        //return ret;
    }
    catch(err){
        ret = "while getting admin list, an error has occured: "+err;
        console.log(ret);
        res.send(ret);
    }
}

function get_admin(sent_admin,res){
    var ret;
    console.log(sent_admin);

    //////need to sanitize
    //////need to validate session again

    try{
        adminsModel.getAdmin(sent_admin.username,res);
    }
    catch(err){
        ret = "while getting admin, an error has occured: "+err;
        console.log(ret);
        res.send(ret);
    }
}

function update_admin(createdAdmin,res){

    var ret;
    console.log(createdAdmin);

    //////need to sanitize
    //////need to validate session again

    try{
        adminsModel.updateAdmin(createdAdmin,res);

    }
    catch(err){
        ret = "while getting admin, an error has occured: "+err;
        console.log(ret);
        res.send(ret);
    }
}


var self = module.exports = {

    createAdmin: function(createdAdmin,res){
        return create_admin(createdAdmin,res);
    },
    deleteadmin: function(sentAdmin,res){
        return delete_admin(sentAdmin,res);
    },
    getadmins: function(req, res, next){
        return get_admins(req, res, next);
    },
    getadmin: function(sentAdmin,res){
        return get_admin(sentAdmin,res);
    },
    updateadmin: function(sentAdmin,res){
        return update_admin(sentAdmin,res);
    }

};

