var app = angular.module("schoolApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/page1-login.html",
            controller: "page1"
        })
        .when("/School", {
            templateUrl: "views/page7-School.html",
            controller: "page7"
        })
        .when("/Administration", {
            templateUrl: "views/page8-administration.html",
            controller: "page8"
        })
        .when("/login", {
            templateUrl: "views/page1-login.html",
            controller: "page1"
        })
        .when("/forgotPassword", {
            templateUrl: "views/page2-mail-insert.html",
            controller: "page2"
        })
        .when("/ConfirmMailSent", {
            templateUrl: "views/page3-confirmation.html",
            controller: "page3"
        })

});


app.directive('loginForm', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/login-template.html'
    };
});


app.service('sharedProperties', function ($rootScope) {
    var UserName = '';
    var UserPass = '';
    var token = '';
    var savedCred = '';
    var savedDisplayName = '';
    var savedUsername = '';
    var recoveryMail = '';

    return {
        getRecoveryMail: function () {
            return recoveryMail;
        },
        setRecoveryMail: function (value) {
            recoveryMail = value;
        },
        getUserName: function () {
            return UserName;
        },
        setUserName: function (value) {
            UserName = value;
        },
        getUserPass: function () {
            return UserPass;
        },
        setUserPass: function (value) {
            UserPass = value;
        },
        getToken: function () {

            var tokenObj = new Object({
                TdisplayName: savedDisplayName,
                Tcred: savedCred,
                Ttoken: token,
                Tuser: savedUsername
            });
            return tokenObj;
        },
        setTuser: function (Tuser) {
            usedT = token;
            usedT.Tuser = Tuser;
            token = usedT;
        },
        getTuser: function () {
            return savedUsername;
        },
        broadcastTuser: function (Tuser) {
            $rootScope.$broadcast('UserDisplayName', {"Tuser": Tuser});
            console.log("started broadcast");
        },
        isLoggedIn: function () {
            if (token) return true;
            if (!token) return false;
        },
        setToken: function (data) {
            token = data.token;
            savedCred = data.cred;
            savedDisplayName = data.disname;
            savedUsername = data.user;
        },
        resetToken: function () {
            token = '';
            savedCred = '';
            savedDisplayName = '';
            savedUsername = '';
        },
        addToken: function (obj) {
            obj.Ttoken = token;
            obj.Tcred = savedCred;
            obj.TdisplayName = savedDisplayName;
            obj.Tuser = savedUsername;

            return obj;
        },
        getSavedCred: function () {
            return savedCred;
        }
    }
});

