app.controller("page1", function ($scope, $http, sharedProperties, $location) {
    console.log('page1: mail- ' + $scope.LoginUserName + "  pass:" + $scope.LoginUserpassword);
    $scope.UserDisplayName = false;

    $scope.submitLogIn = function () {

        console.log('user name:' + sharedProperties.getUserName());
        console.log('user pass:' + sharedProperties.getUserPass());

        var loginUser = {
            "username": $scope.LoginUserName,
            "password": $scope.LoginUserpassword
        };

        $http({
            method: 'POST',
            url: 'http://localhost:3000/users/login',
            data: loginUser
        }).then(function (result) {
            $scope.content = result.data.message;
            //console.log(result.data.message);
            //console.log("res content: " + JSON.stringify(result.data.cred));
            if (result.data.message == 'Login successful') {
                sharedProperties.setTuser($scope.LoginUserName);
                sharedProperties.setUserName($scope.LoginUserName);
                sharedProperties.setUserPass($scope.LoginUserpassword);
                sharedProperties.setToken(result.data);
                sharedProperties.broadcastTuser($scope.LoginUserName);
                $scope.UserDisplayName = $scope.LoginUserName;
                //console.log("$scope.UserDisplayName: " + $scope.UserDisplayName);
                $location.path('/School');
            }
        }, function (err) {
            $scope.content = err;
        });


    };

})
;


