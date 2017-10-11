var jwt = require('jwt-simple');
var secret = 'uwevewevewe4132';


function jwt_encode(payload) {

    var tokenn = jwt.encode(payload, secret);   // used double N , token is a special word
    return tokenn;
}

function jwt_decode(tokenn) {

    var decoded = jwt.decode(tokenn, secret);
    return decoded;
}

function OwnerCredCheck(tokenn) {

    if(!tokenn){return false;}
    console.log("tokenn: " + JSON.stringify(tokenn));
    var decoded = jwt_decode(tokenn);
    if (decoded.credentials >= 9000) {
        return true;
    }
    else {
        return false;
    }
}

function ManagerCredCheck(tokenn) {

    //console.log("tokenn: " + JSON.stringify(tokenn));
    if(!tokenn){return false;}
    var decoded = jwt_decode(tokenn);
    console.log("tokenn: " + JSON.stringify(tokenn));
    if (decoded.credentials >= 6000) {
        return true;
    }
    else {
        return false;
    }
}

function SalesCredCheck(tokenn) {

    if(!tokenn){return false;}
    var decoded = jwt_decode(tokenn);
    if (decoded.credentials >= 3000) {
        return true;
    }
    else {
        return false;
    }
}

function determineCredentials(sent_credentials)
{
    if (sent_credentials >= 9000) {
        return 'owner';
    }
    if (sent_credentials >= 6000 && sent_credentials < 9000) {
        return 'manager';
    }
    if (sent_credentials >= 3000 && sent_credentials < 6000) {
        return 'sales';
    }
}

var self = module.exports = {

    JWTencode: function (payload) {
        return jwt_encode(payload);
    },
    JWTdecode: function (tokenn) {
        return jwt_decode(tokenn);
    },
    Manager_Cred_Check: function (tokenn) {
        return ManagerCredCheck(tokenn);
    },
    Sales_Cred_Check: function (tokenn) {
        return SalesCredCheck(tokenn);
    },
    Owner_Cred_Check: function (tokenn) {
        return OwnerCredCheck(tokenn)
    },
    determine_Credentials: function (sent_credentials) {
        return determineCredentials(sent_credentials)
    }
};