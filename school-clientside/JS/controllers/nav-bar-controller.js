app.controller("nav-bar-controller", function ($scope, $http, sharedProperties, $location) {
    console.log('nav-bar-controller: reached nav-bar-controller ');
    $scope.displayShowLogout = false;
    $scope.displayShowManagers = true;
    var cred = sharedProperties.getSavedCred();

    if (cred != "owner" && cred != "manager") {
        $scope.displayShowManagers=false;
    }

    $scope.$on('UserDisplayName', function (response) {
        setTimeout(function () {
            //console.log("got broadcast");
            //console.dir(response);
            $scope.displayShowLogout = true;
            $scope.displayName = sharedProperties.getTuser();
            var cred = sharedProperties.getSavedCred();

            $scope.displayShowManagers = true;
            if (cred != "owner" && cred != "manager") {
                $scope.displayShowManagers=false;
            }
            //console.log("shared val: " + $scope.displayName + "  res: " + response);
        }, 10);

    });

    $scope.Logout = function () {

        var token = sharedProperties.getToken();
        sharedProperties.setToken({});
        $scope.displayShowLogout = false;
        $scope.displayShowManagers = false;
        //console.log("log out function");

        $http({
            method: 'POST',
            url: 'http://localhost:3000/users/logout',
            data: token
        }).then(function (result) {
            $scope.content = result.data;
            console.log(result.data);
            sharedProperties.resetToken();
            $location.path('/login');
        }, function (err) {
            $scope.content = err;
        });
    };

    $scope.dislayLogout = function () {
        return sharedProperties.getTuser;
    };
});