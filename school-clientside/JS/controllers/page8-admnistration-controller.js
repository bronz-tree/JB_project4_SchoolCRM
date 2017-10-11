app.controller("page8", function ($scope, $http, sharedProperties, $location) {
    console.log('page8: administration ');

    if(!sharedProperties.isLoggedIn()){
        $location.path('/login');   //redirect to login page if not logged in
    }

    var managers = [];

    $http({
        method: 'POST',
        url: 'http://localhost:3000/admins',
        data: sharedProperties.getToken()
    }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                managers.push(response.data[i]);
            }
            console.log("Managers: " + JSON.stringify(managers));
            $scope.managers = managers;

        }, function (response) {
            //Second function handles error
            $scope.content = "Something went wrong in Manager func:" + response;
            console.log($scope.content);
        });


    $scope.editManager = function (i) {          //editManager- is the function , EditManager- the object
        console.log("edit:" + i);
        $scope.dinamic_display_state = "edit-manager";
        $scope.content = false;
        $scope.EditManager = i;
        return;
    };

    $scope.createManager = function () {          //createManager- is the function , CreateManager- the object
        console.log("Create new manager");
        $scope.dinamic_display_state = "create-manager";
        $scope.content = false;
        $scope.CreatedManager = {};
        return;
    };
    $scope.deleteManager = function (deleted) {          //deleteManager- is the function , DeletedManager- the object
        console.log("Create new manager");
        $scope.dinamic_display_state = "delete-manager";
        $scope.content = "Are you sure you wish to delete?";
        $scope.DeletedManager = deleted;
        return;
    };

    $scope.submitCreatedManager = function () {
        console.log('got to submit Managers func');

        var sentData = sharedProperties.addToken($scope.CreatedManager);

        $http.post('http://localhost:3000/admins/create', sentData).then(function (result) {
            $scope.content = result.data;
            console.log(result.data);
        }, function (err) {
            $scope.content = err;
        });
    };

    $scope.submitDeletedManager = function (DeletedManager) {
        console.log("delete:" + JSON.stringify(DeletedManager));

        var sentData = sharedProperties.addToken(DeletedManager);

        $http.post('http://localhost:3000/admins/delete', sentData).then(function (result) {
            $scope.content = result.data;
            console.log(result.data);
        }, function (err) {
            $scope.content = err;
        });
    };


    $scope.reload = function () {
        location.reload();
    };

    $scope.submitEditedManager = function () {
        console.log('got to submit Managers func');
        console.log('username: ' + $scope.EditManager.username);

        var sentData = sharedProperties.addToken($scope.EditManager);

        $http.post('http://localhost:3000/admins/update', sentData).then(function (result) {
            $scope.content = result.data;
            console.log(result.data);
        }, function (err) {
            $scope.content = err;
        });
    };

    $scope.getManager = function () {

        console.log('got to get Managers func');
        var managers = [];
        $scope.managers = managers;

        $http({
            method: 'POST',
            url: 'http://localhost:3000/admins',
            data: sharedProperties.getToken()
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                managers.push(response.data[i]);
            }
            console.log("Managers: " + JSON.stringify(managers));
            $scope.managers = managers;

        }, function (response) {
            //Second function handles error
            $scope.content = "Something went wrong in Manager func:" + response;
            console.log($scope.content);
            console.log("respone string: "+JSON.stringify(response));
        });
    };

});


